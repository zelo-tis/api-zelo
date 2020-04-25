import { TreatmentInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';


export class  Treatment extends Model<TreatmentInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'name',
      'description',
    ];

    super('treatment', columns);
  }

}

export default new Treatment();
