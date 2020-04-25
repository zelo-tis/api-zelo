import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';

import ModelChangeRecord from '../models/change-record.model';

class ChangeRecordController extends Controller {
  public async generateChangeRecords(req: Request, res: Response) {
    const result = await ModelChangeRecord.generateChangeRecords();
    res.json({ status: true, data: result})
  }
}
export default new ChangeRecordController();
