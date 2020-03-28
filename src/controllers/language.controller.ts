import { Request, Response } from 'express';
import Language from '../models/language.model';
import Controller from '../common/utils/class/controller';
import languageTransformation from '../common/data-transformations/language.transformation';

class LanguageController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = languageTransformation(req.body);

      const [id] = await Language.insert(data);

      const response = await Language.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const id = this.getIdFromRequestParams(req);
      const data = languageTransformation(req.body);

      await Language.update({ id }, data);

      const response = await Language.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Language.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = languageTransformation(req.body);
      const response = await Language.getAll(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Language.getOne({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

export default new LanguageController();
