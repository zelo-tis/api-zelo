import { PatientInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import TreatmentModel from "./treatment.model";
import PatientRestrictionModel from "./patient-restriction.model";
import PatientRestriction from './patient-restriction.model';

export class Patient extends Model<PatientInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'name',
      'attendance_number',
      'braden',
      'observation'
    ];

    super('patient', columns);
  }

  public async getPatientActualTreatments(where?: any, renameColumns = true) {
    const treatments = await TreatmentModel.getAll();
    const patientRestrictions = await PatientRestrictionModel.getPatientTreatmentsRestrictions(where);
   const treatmentChange = treatments[3];
    return treatments.filter((t, index) => index !== 3).map(
      (treatment) => patientRestrictions.some(
        (patientRestriction) => patientRestriction.treatment_id === treatment.id)
      ? treatmentChange : treatment
    )
  }

  public async list(
    where?: any,
    orderBy?: { column: number; order: number },
    page: number = 0,
    limit: number = 10,
    customWhere?: any
  ) {
    let { column = 0, order = 0 } = orderBy || {};
    const sortableColumns = this.getSelect();
    const query = this.knex(this.knex.raw(`${this.table} t`))
      .select([
        't.id',
        's.name as station',
        'bed.number as bed',
        't.attendance_number',
        't.name as patient_name',
        't.braden',
        'pm.observation as patient_monitoring_observation',
        'pm.contact_restriction',
        'mf.frequency',
        'pm.id as id_monitoring',
        'pm.active as active',
        this.knex.raw("DATE_FORMAT(pm.start_date, \'%d/%m/%Y %H:%i\') as monitoring_start_date"),
        this.knex.raw("DATE_FORMAT(pm.end_date, \'%d/%m/%Y %H:%i\') as monitoring_end_date"),
      ])
      .leftJoin(this.knex.raw('patient_monitoring pm'), 'pm.patient_id', 't.id')
      .innerJoin(this.knex.raw('movement_frequency mf'), 'mf.id', 'pm.movement_frequency_id')
      .innerJoin(this.knex.raw('bed'), 'bed.id', 'pm.bed_id')
      .innerJoin(this.knex.raw('station s'), 's.id', 'bed.station_id')
      .where({
      })
      .where(where);

    if(customWhere.period){
      query.where(this.knex.raw(`t.prevision_date BETWEEN '${customWhere.period.startDate}' AND '${customWhere.period.endDate}' `));
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

    let data = await query
      .orderBy(sortableColumns[column], order == 0 ? 'DESC' : 'ASC')
      .limit(limit)
      .offset(page * limit);


    if(where.patient_id){
      data[0].restrictions = await PatientRestriction.getAll({patient_id: data[0]})
    }

    return {
      page,
      limit,
      total,
      data
    };
  }
}


export default new Patient();
