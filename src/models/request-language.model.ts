import Model from '../common/utils/class/model';
import { RequestLanguageInterface } from '../common/interfaces/database';

class RequestLanguage extends Model<RequestLanguageInterface> {
  constructor() {
    super('request_language');
  }
}

export default new RequestLanguage();
