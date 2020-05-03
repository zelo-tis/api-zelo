import {ChangeRecordInterface, PatientMonitoringInterface} from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import PatientMonitoringModel from './patient-monitoring.modal';
import TreatmentModel from './treatment.model';
import {CHANGE_RECORD_STATUS, DATE_FORMAT} from '../common/constants';
import moment from 'moment';
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

    if(patientLastRecord){
      startDate = patientLastRecord.prevision_date;
    }

    const today = moment().format(DATE_FORMAT.DEFAULT);
    let endDate;
    if(moment(startDate).format(DATE_FORMAT.DEFAULT) <= today) {
      endDate = moment(today).add(5, 'days').format(DATE_FORMAT.DEFAULT);
    }else{
      endDate = moment(startDate).add(5, 'days').format(DATE_FORMAT.DEFAULT);
    }

    // if(endDate === moment(today).add(5, 'days').format(DATE_FORMAT.DEFAULT)) return false;

    const frequency = monitoring.frequency;
    const treatments = await TreatmentModel.getAll();
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

  public async list(
    where?: any,
    orderBy?: { column: number; order: number },
    page: number = 0,
    limit: number = 10
  ) {
    const { column = 0, order = 0 } = orderBy || {};
    const sortableColumns = this.getSelect();
    const query = this.knex(this.knex.raw(`${this.table} t`))
      .select([
        's.name as station',
        'bed.number as bed',
        'p.attendance_number',
        'p.name as patient_name',
        'p.braden',
        't.prevision_date',
        'pm.start_date as monitoring_start_date',
        'ph.start_date as hospitalization_start_date'
      ])
      .innerJoin(this.knex.raw('patient p'), 'p.id', 't.patient_id')
      .innerJoin(this.knex.raw('patient_monitoring pm'), 'pm.patient_id', 't.patient_id')
      .innerJoin(this.knex.raw('patient_hospitalization ph'), 'ph.patient_id', 't.patient_id')
      .innerJoin(this.knex.raw('bed'), 'bed.id', 'ph.bed_id')
      .innerJoin(this.knex.raw('station s'), 's.id', 'bed.station_id')
      .where({
        'pm.active': true,
        'ph.active': true,
        't.status': 'TODO',
      });

    if(where.period){
      query.where(this.knex.raw(`t.prevision_date BETWEEN '${where.period.startDate}' AND '${where.period.endDate}' `));
    }
    if(where.now){
      const dateNow =  moment().format('YYYY-MM-DD HH:MM');
      console.log('dateNow', dateNow);
      query.where(this.knex.raw(`t.prevision_date >= '${dateNow}' `));
    }
    const count = query.clone();

    const total = await count
      .select(this.knex.raw('COUNT(0) AS total'))
      .first()
      .then((response) => {
        const { total = 0 } = response;
        return total;
      });

    let data = await query
      .groupBy('t.patient_id')
      .orderBy(sortableColumns[column], order == 0 ? 'DESC' : 'ASC')
      .limit(limit)
      .offset(page * limit);

    return {
      page,
      limit,
      total,
      data
    };
  }
}

export default new ChangeRecord();