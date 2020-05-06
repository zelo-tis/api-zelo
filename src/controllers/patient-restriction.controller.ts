import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import PatientRestrictionModel from '../models/patient-restriction.model';
import dataTransformation from '../common/data-transformations/patient-restriction.transformation';

class PatientRestrictionController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = dataTransformation(req.body);

      const [id] = await PatientRestrictionModel.insert(data);

      const response = await PatientRestrictionModel.getOne({id});

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

      await PatientRestrictionModel.update({ id }, data);

      const response = await PatientRestrictionModel.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await PatientRestrictionModel.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = dataTransformation(req.body);
      const response = await PatientRestrictionModel.getAll(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);

      const response = await PatientRestrictionModel.getOne({ id});
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
export default new PatientRestrictionController();
