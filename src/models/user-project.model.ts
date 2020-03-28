import Model from '../common/utils/class/model';
import { UserProjectInterface } from '../common/interfaces/database';

class UserProject extends Model<UserProjectInterface> {
  constructor() {
    super('user_project');
  }
}

export default new UserProject();
