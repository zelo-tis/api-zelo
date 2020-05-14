import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';
import restrictionTransformation from '../common/data-transformations/restriction.transformation';
import RestrictionModel from '../models/restriction.model';

class RestrictionController extends Controller {
  public async getList(req: Request, res: Response) {
    const data = restrictionTransformation(req.query);
    const list = await RestrictionModel.list(
      data);
    res.json({ status: true, data: list})
  }
}
export default new RestrictionController();
