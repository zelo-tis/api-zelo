import { UserInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';


export class User extends Model<UserInterface> {
  public id?: number;

  public languages?: number[];

  public userProject?: number[];

  constructor() {
    const columns = [
      'id',
      'name',
      'role',
      'username',
      'email'
    ];

    super('user', columns);
  }

  public async insert(data: UserInterface) {
    const response = await this.knexInsert(data);
    this.id = response[0];


    return response;
  }

  //
  // public async update(where: UserInterface, data: UserInterface) {
  //   this.id = where.id;
  //
  //   const response = await this.knexUpdate(where, data);
  //
  //   if (this.id && response) {
  //     await this.deleteLanguages();
  //     await this.insertLanguages();
  //   }
  //
  //   return response;
  // }
  //
  //
  // public async updateUserLanguages(where: UserInterface, languages: number[]) {
  //   let response = {};
  //   this.languages = languages;
  //   if (languages && where.id) {
  //     await this.deleteLanguages();
  //     response = await this.insertLanguages();
  //   }
  //   return response;
  // }

  // public async getLanguages(userId: number) {
  //   return Language.knexGetAll()
  //     .leftJoin(
  //       this.knex.raw(`${UserLanguage.table} pl`),
  //       't.id',
  //       'pl.language_id'
  //     )
  //     .where('pl.user_id', userId);
  // }
  //
  // public async getAllByUserName(fields: string, values: string[], where?: UserInterface, renameColumns = true) {
  //   return this.knexGetAll(where, renameColumns).whereIn(fields, values);
  // }
  //
  // public async insertLanguages() {
  //   if (!this.languages) return false;
  //
  //   const languagesToInert = this.languages.map((language_id) => ({
  //     language_id,
  //     user_id: this.id
  //   }));
  //
  //   return UserLanguage.insert(languagesToInert);
  // }
  //
  // public async insertProjects() {
  //   if (!this.userProject) return false;
  //
  //   const projectsToInsert = this.userProject.map((project_id) => ({
  //     project_id,
  //     user_id: this.id
  //   }));
  //
  //   return UserProject.insert(projectsToInsert);
  // }
  //
  // public async deleteLanguages() {
  //   return UserLanguage.delete({ user_id: this.id });
  // }
  //
  // public async deleteProjects() {
  //   return UserProject.delete({ user_id: this.id });
  // }
  //
  // public async getUser(filterWhere?: UserInterface) {
  //   const response = await this.knex(this.table)
  //     .where(filterWhere)
  //     .first();
  //   return response;
  // }
  //
  // public getUserProject(userId: number) {
  //   return UserProject.getOne({ user_id: userId });
  // }
  //
  // public async getOne(where?: UserInterface, renameColumns = true) {
  //   const result = await super.getOne(where, renameColumns);
  //   if (result?.id) {
  //     const id: number = +result.id;
  //
  //     if (id) {
  //       result.projectUser = await this.getUserProject(id);
  //       result.languages = await this.getLanguages(id);
  //     }
  //   }
  //   return result;
  // }
}

export default new User();
