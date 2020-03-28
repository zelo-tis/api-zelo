import Model from '../common/utils/class/model';
import { RequestPictureInterface } from '../common/interfaces/database';

class RequestPicture extends Model<RequestPictureInterface> {
  constructor() {
    const columns = [
      'id',
      'request_id AS requestId',
      'url',
      'transifex_id as transifexId'
    ];
    super('request_picture', columns);
  }
}

export default new RequestPicture();
