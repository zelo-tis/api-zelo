import { Request, Response } from 'express';
import RequestModel from '../models/request.model';
import ProjectTransifex from '../models/project-transifex.model';
import RequestPicture from '../models/request-picture.model';
import * as S3Utils from '../common/utils/s3.utils';
import * as TransifexUtils from '../common/utils/transifex.utils';
import Controller from '../common/utils/class/controller';
import requestTransformation from '../common/data-transformations/request.transformation';
import requestPictureTransformation from '../common/data-transformations/request-picture.transformation';
import { NotFoundError } from '../common/utils/errors';

class RequestController extends Controller {
  public async getAll(req: Request, res: Response) {
    const { page = 0, limit = 10, orderCol = 0, order = 0 } = req.query;
    const search = requestTransformation(req.body);

    try {
      RequestModel.languages = search.languages;

      const response = await RequestModel.list(
        { column: +orderCol, order: +order },
        +page,
        +limit,
        search.request
      );

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await RequestModel.getOne({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async deletePicture(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const data = await RequestPicture.getOne({ id });

      if (data.key) {
        await S3Utils.deleteObject(data.key);
      }

      const response = RequestPicture.delete({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);
      const data = requestTransformation(req.body);

      RequestModel.languages = data.languages;
      RequestModel.labels = data.labels;
      RequestModel.pullRequest = data.pullRequest;

      const [id] = await RequestModel.insert(data.request);
      const response = await RequestModel.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);
      const id = this.getIdFromRequestParams(req);
      const data = requestTransformation(req.body);

      RequestModel.languages = data.languages;
      RequestModel.labels = data.labels;

      await RequestModel.update({ id }, data.request);

      const response = await RequestModel.getOne({ id });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async savePictures(req: Request, res: Response) {
    try {
      const requestId = this.getIdFromRequestParams(req);
      const data = requestPictureTransformation(req.body, requestId);
      const request = await RequestModel.getOne({ id: requestId });

      if (!request.projectId) {
        throw new NotFoundError(
          'Translation request must be a projectId to save pictures'
        );
      }

      const projectTransifex = await ProjectTransifex.getOne({
        project_id: request.projectId
      });

      if (!projectTransifex) {
        throw new NotFoundError('Transifex configurations not found');
      }

      const transifexResponse = await TransifexUtils.mapScreenshots(
        projectTransifex.resourceSlug,
        projectTransifex.projectSlug,
        data,
        request.labels
      );

      const insertedPicutres = await RequestPicture.insert(data);

      res.json({ insertedPicutres, transifexResponse });
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
export default new RequestController();
