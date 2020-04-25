import { ChangeRecordInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import PatientMonitoringModel from './patient-monitoring.modal';
import TreatmentModel from './treatment.model';
import {calcNextHour} from '../common/utils/date.utils';
import {CHANGE_RECORD_STATUS} from '../common/constants';
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
    const frequency = monitoring.frequency;
    const treatments = await TreatmentModel.getAll();
    let nextDate = startDate;
    const newRecords = [];
    let treatmentIndex = 0;

    for(let i=0; i < 4; i++){
      nextDate = moment(nextDate).add(frequency, 'hours').format('YYYY-MM-DD HH:SS');
      if(treatmentIndex === treatments.length) treatmentIndex = 0;
      const treatment = treatments[treatmentIndex];

      const newRecord = this.insert({
         patient_id: monitoring.patient_id,
         prevision_date: nextDate,
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
}

export default new ChangeRecord();
