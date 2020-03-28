import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import ProjectTransifexModel from '../models/project-transifex.model';
import LanguageModel from '../models/language.model';
import userModel, { User } from '../models/user.model';
import TransifexService from '../common/services/transifex.service';

class UserTransifexController extends Controller {
  public async getProjectLanguagesUsers(req: Request, res: Response) {
    try {
      const projects = await ProjectTransifexModel.getAll();
      const promises = projects.map((project) => Promise.all([project.projectSlug, TransifexService.getProjectLanguagesUsers(project.projectSlug)]));
      const promisesResolved = await Promise.all(promises);
      const languages = await LanguageModel.getAll();
      let users: any = {};

      for (const promise of promisesResolved) {
        const [project, request] = promise;
        for (const language of request.data) {
          const languageId = languages.find((l) => l.languageCode == language.language_code).id;
          for (const projectUser of language.translators) {
            users = this.addUser(project, projectUser, users, languageId, 'TRANSLATOR');
          }
          for (const projectUser of language.coordinators) {
            users = this.addUser(project, projectUser, users, languageId, 'COORDINATORS');
          }
        }
      }
      const promiseResponse = await this.saveUsers(users);
      res.json(promiseResponse);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public addUser(project: number, username: any, users: any, languageId: number, role: string) {
    if (users[username]) {
      users[username].languages.push(languageId);
    } else {
      users[username] = {
        languages: [languageId],
        projects: [project],
        role
      };
    }
    return users;
  }

  public newUser(user: any) {
    const newUser = new User();
    newUser.languages = user.languages;
    return newUser.insert({
      username: user.username,
      role: user.role
    });
  }

  public async saveUsers(users: any) {
    const usernames = Object.keys(users);
    const usersFind = await userModel.getAllByUserName('username', usernames);
    const promises = usernames.map((username) => {
      const user = users[username];
      const userFind = usersFind ? usersFind.find((u) => u.username == username) : false;
      if (userFind) {
        return new User().updateUserLanguages({ id: userFind.id }, user.languages);
      }
      return this.newUser({ ...user, username });
    });
    return Promise.all(promises);
  }
}
export default new UserTransifexController();
