import Model from '../common/utils/class/model';
import { UserLanguageInterface } from '../common/interfaces/database';

class UserLanguage extends Model<UserLanguageInterface> {
  constructor() {
    super('user_language');
  }
}

export default new UserLanguage();
