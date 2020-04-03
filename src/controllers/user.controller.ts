import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';

class UserController extends Controller {
  public async getAll(req: Request, res: Response) {
    res.json({ status: true, data: []})
  }
}
export default new UserController();
