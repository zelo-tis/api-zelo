import { Request, Response } from 'express';
import Project from '../models/project.model';
import * as GithubUtils from '../common/utils/github.utils';
import * as RequestUtils from '../common/utils/request.utils';
import projectTransformation from '../common/data-transformations/project.transformation';
import Controller from '../common/utils/class/controller';

class ProjectController extends Controller {
  public async insert(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const data = projectTransformation(req.body);

      Project.languages = data.projectLanguages;
      Project.transifex = data.projectTransifex;

      const [projectId] = await Project.insert(data.project);
      const gitEventUrl = `${RequestUtils.getBaseUrl(req)}/git/event`;
      const github_hook_id = await GithubUtils.deleteAndInsertNewHook(
        undefined,
        undefined,
        data.project.github_repo,
        gitEventUrl
      );

      if (github_hook_id) await Project.update({ id: projectId }, { github_hook_id });
      const project = await Project.getOne({ id: projectId });

      res.json(project);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      this.validateRequest(req);

      const id = this.getIdFromRequestParams(req);
      const data = projectTransformation(req.body);

      const projectOld = await Project.getOne({ id }, false);
      const gitEventUrl = `${RequestUtils.getBaseUrl(req)}/git/event`;
      const github_hook_id = await GithubUtils.deleteAndInsertNewHook(
        projectOld.github_repo,
        projectOld.github_hook_id,
        data.project.github_repo,
        gitEventUrl
      );

      Project.languages = data.projectLanguages;
      Project.transifex = data.projectTransifex;

      await Project.update({ id }, { ...data.project, github_hook_id });

      const project = await Project.getOne({ id });

      res.json(project);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Project.delete({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { project } = projectTransformation(req.body);
      const response = await Project.getAll(project);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = this.getIdFromRequestParams(req);
      const response = await Project.getOne({ id });
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

export default new ProjectController();
