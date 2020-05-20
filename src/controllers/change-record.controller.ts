import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import changeRecordTransformation from '../common/data-transformations/change-record.transformation';
import ModelChangeRecord from '../models/change-record.model';
import moment from 'moment';
import {DATE_FORMAT} from '../common/constants';

class ChangeRecordController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = changeRecordTransformation(req.body);

      const [id] = await ModelChangeRecord.insert(data);

      const response = await ModelChangeRecord.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const id = this.getIdFromRequestParams(req);
      const data = changeRecordTransformation(req.body);

      if(data.completed_at){
        const item = await ModelChangeRecord.getOne({id});
        const prevision = moment(item.prevision_date);
        const diff = prevision.diff(data.completed_at);
        if(diff < 0){
          data.completed_late = true;
        }
      }
      console.log('data', data);
      await ModelChangeRecord.update({ id }, data);

      const response = await ModelChangeRecord.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await ModelChangeRecord.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const where = changeRecordTransformation(req.query);
      const response = await ModelChangeRecord.getAll(where);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await ModelChangeRecord.getOne({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
  public async generateChangeRecords(req: Request, res: Response) {
    const result = await ModelChangeRecord.generateChangeRecords();
    res.json({ status: true, data: result})
  }

  public async deleteNextRecords(req: Request, res: Response) {
    const where = changeRecordTransformation(req.body);
    const result = await ModelChangeRecord.deleteNextRecords(where);
    res.json({ status: true, data: result})
  }
}
export default new ChangeRecordController();
