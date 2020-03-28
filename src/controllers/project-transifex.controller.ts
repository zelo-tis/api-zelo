import { Request, Response } from 'express';
import TransifexService from '../common/services/transifex.service';
import { ProjectTransifexInterface } from '../common/interfaces/database';
import Controller from '../common/utils/class/controller';

class ProjectTransifexController extends Controller {
  public async getTransifexProjectList(req: Request, res: Response) {
    try {
      const response = await TransifexService.getTransifexProjects();
      const projectsList: Array<ProjectTransifexInterface> = [];
      if (response.data) {
        for (const project of response.data) {
          const { source_language_code, slug, name } = project;
          const projectItem: ProjectTransifexInterface = {
            resource_language: source_language_code,
            project_name: name,
            project_slug: slug
          };
          projectsList.push(projectItem);
        }
      }
      res.json({ success: true, data: projectsList });
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getTransifexProjectResources(req: Request, res: Response) {
    const project_slug = req.params?.project_slug;

    if (!project_slug) {
      res.status(500).send('Erro');
    }
    try {
      const response = await TransifexService.getTransifexProjectDetails(project_slug);
      const projectDetails: Array<ProjectTransifexInterface> = [];
      if (response?.data?.resources) {
        for (const resource of response.data.resources) {
          const { slug, name } = resource;
          const projectItem: ProjectTransifexInterface = {
            resource_name: name,
            resource_slug: slug
          };
          projectDetails.push(projectItem);
        }
      }
      res.json({ success: true, data: projectDetails });
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async getProjectLanguages(req: Request, res: Response) {
    try {
      const projectSlug = req.params?.projectSlug;
      const response = await TransifexService.getProjectLanguages(projectSlug);
      const languages = response.data.data.map(({ attributes }: any) => ({
        code: attributes.code,
        name: attributes.name
      }));
      res.json(languages);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

export default new ProjectTransifexController();
