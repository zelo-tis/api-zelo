import {ChangeRecordInterface, PatientMonitoringInterface} from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import PatientMonitoringModel from './patient-monitoring.model';
import PatientModel from './patient.model';
import {CHANGE_RECORD_STATUS, DATE_FORMAT} from '../common/constants';
import moment from 'moment';
import {calcDeadline} from "../common/utils/date.utils";
export class ChangeRecord extends Model<ChangeRecordInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'patient_id',
      'responsible_user_id',
      'prevision_date',
      'treatment_id',
      'status',
      'completed_by_user_id',
      'completed_at',
      'created_at'
    ];

    super('change_record', columns);
  }

  public async generateChangeRecords(){
    const monitorings = await PatientMonitoringModel.list({
      active: true
    });
    const promises = monitorings.data.map((monitoring) => this.generateChangeRecord(monitoring));
    return await Promise.all(promises);
  }

  public async generateChangeRecord(monitoring: any){
    const patientLastRecord =  await this.getLastPatientChangeRecord(monitoring.patient_id);
    let startDate = monitoring.start_date;
    const DAYS_BASE = 1;
    if(patientLastRecord){
      startDate = patientLastRecord.prevision_date;
    }

    const today = moment().format(DATE_FORMAT.DEFAULT);

   let endDate = moment(today).add(DAYS_BASE, 'days').format(DATE_FORMAT.DEFAULT);

    const frequency = monitoring.frequency;
    const treatments = await PatientModel.getPatientActualTreatments({
      patient_id:monitoring.patient_id
    });
    let nextDate = moment(startDate);

    const newRecords = [];
    let treatmentIndex = 0;

    while(nextDate.format(DATE_FORMAT.DEFAULT) <= endDate){
      nextDate = moment(nextDate).add(frequency, 'hours')
      if(treatmentIndex === treatments.length) treatmentIndex = 0;
      const treatment = treatments[treatmentIndex];

      const newRecord = this.insert({
        patient_id: monitoring.patient_id,
        prevision_date: nextDate.format(DATE_FORMAT.DEFAULT_TIME),
        treatment_id: treatment.id,
        status: CHANGE_RECORD_STATUS.TODO
      });

      treatmentIndex++;
      newRecords.push(newRecord);
    }

    return Promise.all(newRecords);
  }

  public async getLastPatientChangeRecord(patientId: number){
    return this.knexGetOne({
      patient_id: patientId
    })
      .orderBy('created_at', 'DESC');
  }

  public async deleteNextRecords(where: any){
    const date = moment().format(DATE_FORMAT.DEFAULT_TIME);
     return this.knex(this.table)
       .where(where)
      .where(this.knex.raw(`
       prevision_date >= '${date}'
      `))
      .del();
  }

  public async updateNextRecords(where: any){
    const deleteRecords = await this.deleteNextRecords(where);
    const generateRecords = await this.generateChangeRecords();
    return {
      deleteRecords,
      generateRecords
    }
  }

  public async list(
    where?: any,
    orderBy?: { column: number; order: number },
    page: number = 0,
    limit: number = 10,
    customWhere?: any
  ) {
    const { column = 0, order = 0 } = orderBy || {};
    const sortableColumns = this.getSelect();
    const query = this.knex(this.knex.raw(`${this.table} t`))
      .select([
        't.id',
        's.name as station',
        'bed.number as bed',
        'p.attendance_number',
        'p.name as patient_name',
        'treatment.name as treatment_name',
        'p.braden',
        't.status',
         this.knex.raw("DATE_FORMAT(t.prevision_date, \'%Y-%m-%d %H:%i\') as prevision_date"),
        'pm.start_date as monitoring_start_date',
        'pm.observation as patient_monitoring_observation',
        'pm.contact_restriction',
        'ph.start_date as hospitalization_start_date',
        'mf.frequency',
        this.knex.raw('TIMESTAMPDIFF(MINUTE, NOW(), t.prevision_date) AS deadline'),
      ])
      .innerJoin(this.knex.raw('patient p'), 'p.id', 't.patient_id')
      .innerJoin(this.knex.raw('treatment'), 'treatment.id', 't.treatment_id')
      .innerJoin(this.knex.raw('patient_monitoring pm'), 'pm.patient_id', 't.patient_id')
      .innerJoin(this.knex.raw('movement_frequency mf'), 'mf.id', 'pm.movement_frequency_id')
      .innerJoin(this.knex.raw('patient_hospitalization ph'), 'ph.patient_id', 't.patient_id')
      .innerJoin(this.knex.raw('bed'), 'bed.id', 'ph.bed_id')
      .innerJoin(this.knex.raw('station s'), 's.id', 'bed.station_id')
      .where({
        'pm.active': true,
        'ph.active': true,
      })
      .where(where);

    if(customWhere.period){
      query.where(this.knex.raw(`t.prevision_date BETWEEN '${customWhere.period.startDate}' AND '${customWhere.period.endDate}' `));
    }
    if(customWhere.status){
      query.whereIn('t.status', customWhere.status);
    }else{
      query.where('t.status', CHANGE_RECORD_STATUS.TODO);
    }
    if(customWhere.now){
      const dateNow =  moment().format('YYYY-MM-DD HH:MM');
      console.log('dateNow', dateNow);
      query.where(this.knex.raw(`t.prevision_date >= '${dateNow}' `));
    }

    if(customWhere.station){
      query.where({'bed.station_id': customWhere.station});
    }
    const count = query.clone();

    const total = await count
      .select(this.knex.raw('COUNT(0) AS total'))
      .first()
      .then((response) => {
        const { total = 0 } = response;
        return total;
      });

    if(!customWhere.period){
      query.groupBy('t.patient_id')
    }

    let data = await query
      .orderBy(sortableColumns[column], order == 0 ? 'DESC' : 'ASC')
      .limit(limit)
      .offset(page * limit);

    data = data.map((item, key) => ({
      ...item,
      deadline: calcDeadline(item.deadline, item.status)
    }));

    return {
      page,
      limit,
      total,
      data
    };
  }
}

export default new ChangeRecord();
