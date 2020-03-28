import Model from '../common/utils/class/model';
import { PRInterface } from '../common/interfaces/database';

class PR extends Model<PRInterface> {
  constructor() {
    const columns = [
      'github_user_id AS userId',
      'github_repo_id AS repoId',
      'github_pr_id AS pullRequestId',
      'request_id AS requestId',
      'merged_at AS mergedAt'
    ];

    super('pr', columns);
  }
}

export default new PR();
