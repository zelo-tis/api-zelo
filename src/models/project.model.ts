import { ProjectInterface, ProjectTransifexInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import ProjectTransifex from './project-transifex.model';
import ProjectLanguage from './project-language.model';
import Language from './language.model';

class Project extends Model<ProjectInterface> {
  public id?: number;

  public languages?: number[];

  public transifex?: ProjectTransifexInterface;

  constructor() {
    const columns = [
      'id',
      'description',
      'github_repo AS githubRepo'
    ];

    super('project', columns);
  }

  public async insert(data: ProjectInterface) {
    const response = await this.knexInsert(data);

    this.id = response[0];

    if (response) {
      await this.insertLanguages();
      if (this.transifex) {
        await ProjectTransifex.insert({
          ...this.transifex,
          project_id: this.id
        });
      }
    }

    return response;
  }

  public async update(where: ProjectInterface, data: ProjectInterface) {
    this.id = where.id;

    const response = await this.knexUpdate(where, data);

    if (this.id && response) {
      await this.deleteLanguages();
      await this.insertLanguages();
      if (this.transifex) {
        await ProjectTransifex.update(
          { project_id: where.id },
          { project_id: where.id, ...this.transifex }
        );
      }
    }

    return response;
  }

  public async getLanguages(projectId: number) {
    return Language.knexGetAll()
      .leftJoin(
        this.knex.raw(`${ProjectLanguage.table} pl`),
        't.id',
        'pl.language_id'
      )
      .where('pl.project_id', projectId);
  }

  public async insertLanguages() {
    if (!this.languages) return false;

    const languagesToInert = this.languages.map((language_id) => ({
      language_id,
      project_id: this.id
    }));

    return ProjectLanguage.insert(languagesToInert);
  }

  public async deleteLanguages() {
    return ProjectLanguage.delete({ project_id: this.id });
  }

  public async getProject(filterWhere?: ProjectInterface) {
    const response = await this.knex(this.table)
      .where(filterWhere)
      .first();
    return response;
  }

  public getTransifex(projectId: number) {
    return ProjectTransifex.getOne({ project_id: projectId });
  }

  public async getOne(where?: ProjectInterface, renameColumns = true) {
    const result = await super.getOne(where, renameColumns);
    const id: number = +result.id;

    if (id) {
      result.transifex = await this.getTransifex(id);
      result.languages = await this.getLanguages(id);
    }

    return result;
  }
}

export default new Project();
