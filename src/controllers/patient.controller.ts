import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import PatientModel from '../models/patient.model';
import dataTransformation from '../common/data-transformations/patient.transformation';
import dashboardTransformation from '../common/data-transformations/dashboard.transformation';

class PatientController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = dataTransformation(req.body);

      const [id] = await PatientModel.insert(data);

      const response = await PatientModel.getOne({ id });

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

      await PatientModel.update({ id }, data);

      const response = await PatientModel.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await PatientModel.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = dataTransformation(req.query);
      const response = await PatientModel.getAll(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);

      const response = await PatientModel.getOne({ id});
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
  public async getList(req: Request, res: Response) {
    const data = dataTransformation(req.query);
    const list = await PatientModel.list(
      data.patient,
      { column: 2, order: 1 },
      undefined,
      10,
      data.custom);
    res.json({ status: true, data: list})
  }
}
export default new PatientController();
