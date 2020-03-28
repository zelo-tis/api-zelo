import { Request, Response } from 'express';
import Comments from '../models/comments.model';
import Controller from '../common/utils/class/controller';

class CommentsController extends Controller {
  public async insert(req: Request, res: Response) {
    const { request_id } = req.params;
    const { text = '' } = req.body;

    try {
      const [id] = await Comments.insert({
        text,
        request_id: +request_id
      });

      const response = await Comments.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Comments.delete({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const request_id = req.params.request_id ? +req.params.request_id : 0;
      const response = await Comments.getAll({ request_id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

export default new CommentsController();
