import Model from '../common/utils/class/model';
import { ProjectLanguageInterface } from '../common/interfaces/database';

class RequestLanguage extends Model<ProjectLanguageInterface> {
  constructor() {
    super('project_language');
  }
}

export default new RequestLanguage();
