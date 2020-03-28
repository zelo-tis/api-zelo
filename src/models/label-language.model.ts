import Model from '../common/utils/class/model';
import { LabelLanguageInterface } from '../common/interfaces/database';

class LabelLanguage extends Model<LabelLanguageInterface> {
  constructor() {
    super('label_language');
  }
}

export default new LabelLanguage();
