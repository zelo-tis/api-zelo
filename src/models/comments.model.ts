import Model from '../common/utils/class/model';
import { CommentsInterface } from '../common/interfaces/database';

class Comments extends Model<CommentsInterface> {
  constructor() {
    const columns = [
      'id',
      'text',
      'created_at AS createdAt',
      'request_id AS requestId'
    ];

    super('comments', columns);
  }
}

export default new Comments();
