import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import dashboardTransformation from '../common/data-transformations/dashboard.transformation';
import ModelChangeRecord from '../models/change-record.model';

class DashboardController extends Controller {
  public async getListRegistry(req: Request, res: Response) {
    const data = dashboardTransformation(req.query);
    const list = await ModelChangeRecord.list(
      data.changeRecord,
      { column: 3, order: 1 },
      undefined,
      10,
      data.custom);
    res.json({ status: true, data: list})
  }
}
export default new DashboardController();
