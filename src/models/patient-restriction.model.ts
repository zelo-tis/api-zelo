import { PatientRestrictionInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';


export class  PatientRestriction extends Model<PatientRestrictionInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'patient_id',
      'restriction_id'
    ];

    super('patient_restriction', columns);
  }


  public async getPatientTreatmentsRestrictions(where?: any, renameColumns = true) {
    return this.knexGetAll(where, renameColumns)
      .select(['r.*'])
      .innerJoin(this.knex.raw('restriction r'), 'r.id', 't.restriction_id');
  }

  public async list(
    where?: PatientRestrictionInterface,
    orderBy?: { column: number; order: number },
    page: number = 0,
    limit: number = 10
  ) {
    const { column = 0, order = 0 } = orderBy || {};
    const sortableColumns = [
      't.id',
      't.start_date',
      't.end_date',
    ];
    const query = this.knexGetAll(where)
      .select([
        'p.name',
        'mf.frequency'
      ])
      .leftJoin(this.knex.raw('patient p'), 'p.id', 't.patient_id')
      .leftJoin(this.knex.raw('movement_frequency mf'), 'mf.id', 't.movement_frequency_id');

    const count = query.clone();

    const total = await count
      .select(this.knex.raw('COUNT(0) AS total'))
      .first()
      .then((response) => {
        const { total = 0 } = response;
        return total;
      });

    let data = await query
      .groupBy('t.id')
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

export default new PatientRestriction();
