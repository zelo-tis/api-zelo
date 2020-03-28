import Model from '../common/utils/class/model';
import {
  LabelInterface,
  LabelLanguageInterface
} from '../common/interfaces/database';
import Request from './request.model';
import LabelLanguage from './label-language.model';

class Label extends Model<LabelInterface> {
  constructor() {
    const columns = ['id', 'key', 'text', 'request_id AS requestId', 'hash'];

    super('label', columns);
  }

  public async insert(data: LabelInterface | LabelInterface[]) {
    const response = await this.knexInsert(data);
    const firstLabelId = response.pop();

    if (firstLabelId) {
      const dataList = Array.isArray(data) ? data : [data];

      await Promise.all(
        dataList.map((_, index) => {
          const currentLabelId = firstLabelId + index;
          const requestId = Array.isArray(data)
            ? data[index].request_id
            : data.request_id;

          if (!requestId) return Promise.resolve(false);

          return this.saveLabelLanguages(requestId, currentLabelId);
        })
      );
    }

    return response;
  }

  public async saveLabelLanguages(requestId: number, labelId: number) {
    const languages = await Request.getLanguages(requestId);

    const dataToInsert: LabelLanguageInterface[] = languages.map((item) => ({
      label_id: labelId,
      language_id: item.id,
      translated: false
    }));

    const response = await LabelLanguage.insert(dataToInsert);

    return !!response;
  }
}

export default new Label();
