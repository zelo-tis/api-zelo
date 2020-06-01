import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import dashboardTransformation from '../common/data-transformations/dashboard.transformation';
import ModelChangeRecord from '../models/change-record.model';

class DashboardController extends Controller {
  public async getListRegistry(req: Request, res: Response) {
    const data = dashboardTransformation(req.query);
    const { page = 0, limit = 10, orderCol = 0, order = 1 } = req.query;
    const list = await ModelChangeRecord.getNow(
      data.changeRecord,
      { column: +orderCol, order: +order },
      +page,
      +limit,
      data.custom);
    res.json({ status: true, data: list})
  }

  public async getLate(req: Request, res: Response) {
    const data = dashboardTransformation(req.query);

    const response = await Promise.all([
      ModelChangeRecord.list(
      data.changeRecord,
      { column: 3, order: 1 },
      undefined,
      10,
      {...data.custom, now: true}),
      ModelChangeRecord.list(
        data.changeRecord,
        { column: 3, order: 1 },
        undefined,
        10,
        {...data.custom, late: true})
    ]);

    const result = [...response[0].data, ...response[1].data];
    res.json({ status: true, data: result})
  }
}
export default new DashboardController();
