import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';

import ModelDashboard from '../models/dashboard.model';

class DashboardController extends Controller {
  public async getListRegistry(req: Request, res: Response) {
    const list = await ModelDashboard.getListRegistry();
    res.json({ status: true, data: list})
  }
}
export default new DashboardController();
