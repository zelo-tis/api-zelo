import { UserInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';


export class User extends Model<UserInterface> {
  public id?: number;

  constructor() {
    const columns = [
      'id',
      'name',
      'role',
      'username',
      'email'
    ];

    super('user', columns);
  }
}

export default new User();
