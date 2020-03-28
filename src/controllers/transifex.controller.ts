import { Request, Response } from 'express';
import TransifexService from '../common/services/transifex.service';
import LabelLanguageModel from '../models/label-language.model';
import RequestModel from '../models/request.model';

class TransifexController {
  public async checkRequestTranslationStatus(req: Request, res: Response) {
    try {
      const response = await this.runCheckRequestTranslationStatus();
      res.json({ status: true, data: response });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async runCheckRequestTranslationStatus() {
    const projectRequestToCheck = await RequestModel.getProjectRequestToCheck();
    const promises = [];
    for (const project of projectRequestToCheck) {
      const requestToCheck = RequestModel.getRequestLabelsToCheck(project.id);
      const languagesProject = RequestModel.getProjectLanguagesToCheck(project.id);
      promises.push(Promise.all([requestToCheck, languagesProject]).then((resolved) => {
        const [labels, languages] = resolved;
        const keysToCheck = {
          projectSlug: project.project_slug,
          resourceSlug: project.resource_slug,
          languages: languages.filter((language) => language.language_code !== project.resource_language).map((l) => l.language_code),
          keys: labels
        };
        return this.checkKeysLanguages(keysToCheck);
      }));
    }
    const response = await Promise.all(promises);
    return response;
  }

  public async checkKeysLanguages(keysToCheck: any) {
    try {
      let result: Array<any> = [];
      const { projectSlug, resourceSlug, languages } = keysToCheck;
      let promisesResolved: Array<any>;
      try {
        const promises = languages.map((language: string) => Promise.all([language, TransifexService.getProjectKeys(projectSlug, resourceSlug, language, false)]));
        promisesResolved = await Promise.all(promises);
      } catch (error) {
        console.log(error);
        throw new Error('Happened a error in get strings');
      }
      const promisesUpdate = [];
      if (promisesResolved) {
        for (const promise of promisesResolved) {
          const [language, response] = promise;
          const untranslatedKeys = response.data.data.map((item: any) => item.id).toString();
          const keysFilterToCheck = keysToCheck.keys.filter((item: { language_code: string }) => item.language_code === language);
          for (const keyItem of keysFilterToCheck) {
            if (untranslatedKeys.indexOf(keyItem.hash) === -1) {
              promisesUpdate.push(Promise.all([`${keyItem.key}-${language}`, LabelLanguageModel.update({ id: keyItem.id }, { translated: true })]));
            }
          }
        }
        result = await Promise.all(promisesUpdate);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Happened a error in check strings');
    }
  }
}
export default new TransifexController();
