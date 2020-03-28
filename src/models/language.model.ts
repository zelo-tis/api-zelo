import Model from '../common/utils/class/model';
import { LanguageInterface } from '../common/interfaces/database';

class Language extends Model<LanguageInterface> {
  constructor() {
    const columns = ['id', 'description', 'language_code AS languageCode'];

    super('language', columns);
  }
}

export default new Language();
