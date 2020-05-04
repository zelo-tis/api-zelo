import { RestrictionInterface} from '../common/interfaces/database';
import Model from '../common/utils/class/model';


export class  Restriction extends Model<RestrictionInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'description',
      'treatment_id',
    ];

    super('restriction', columns);
  }

  public async list(
    where?: RestrictionInterface,
    orderBy?: { column: number; order: number },
    page: number = 0,
    limit: number = 10
  ) {
    const { column = 0, order = 0 } = orderBy || {};
    const sortableColumns = this.getSelect();
    const query = this.knexGetAll(where)
      .select([
        'treatment.*'
      ])
      .leftJoin(this.knex.raw('treatment'), 'treatment.id', 't.treatment_id');

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

export default new Restriction();
