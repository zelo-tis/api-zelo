import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import dataTransformation from "../common/data-transformations/default.transformation";
import Model from "../models/user.model";

class UserController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = dataTransformation(req.body);

      const [id] = await Model.insert(data);

      const response = await Model.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const id = this.getIdFromRequestParams(req);
      const data = dataTransformation(req.body);

      await Model.update({ id }, data);

      const response = await Model.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Model.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = dataTransformation(req.query);
      const response = await Model.getAll(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);

      const response = await Model.getOne({ id});
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
export default new UserController();
