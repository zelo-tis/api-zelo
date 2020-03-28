import { ProjectTransifexInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';

class ProjectTransifexModel extends Model<ProjectTransifexInterface> {
  constructor() {
    const columns = [
      'project_name AS projectName',
      'project_slug AS projectSlug',
      'resource_name AS resourceName',
      'resource_slug AS resourceSlug',
      'resource_language AS resourceLanguage',
      'project_id AS projectId'
    ];

    super('project_transifex', columns);
  }
}

export default new ProjectTransifexModel();
