import { Request, Response } from 'express';
import GitHub from '../common/services/github.service';
import TransifexService from '../common/services/transifex.service';
import { GithubStringsInterface } from '../common/interfaces/github-strings.interface';
import { TransifexResourceInterface } from '../common/interfaces/transifex-resource.interface';
import { LabelInterface } from '../common/interfaces/database';
import * as GithubUtils from '../common/utils/github.utils';
import * as TransifexUtils from '../common/utils/transifex.utils';
import { getDateTimeString } from '../common/utils/date.utils';
import ProjectModel from '../models/project.model';
import ProjectTransifexModel from '../models/project-transifex.model';
import Controller from '../common/utils/class/controller';
import RequestModel from '../models/request.model';
import { NotFoundError } from '../common/utils/errors';

class GitController extends Controller {
  public async searchRepositories(req: Request, res: Response) {
    const { q } = req.query;

    try {
      const response = await GitHub.searchRepositories(q);
      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async event(req: Request, res: Response) {
    try {
      const data = req.body;

      // if (GithubUtils.checkEventIsMergedPullRequest(data)) {
      //   res.send('');
      // }

      const diffUrl = data?.payload?.pull_request?.diff_url;
      const merged_at = getDateTimeString(data?.payload?.pull_request?.merged_at);
      const github_repo = data?.repo?.name;

      if (!diffUrl) {
        throw new NotFoundError('File .diff not found');
      }

      const content = await GitHub.getPRDiff(diffUrl, req.headers.cookie);
      const labels = GithubUtils.extractLabels(content);
      const project = await ProjectModel.getProject({
        github_repo
      });

      if (!project) {
        throw new NotFoundError('Project not found');
      }

      const projectTransifex = await ProjectTransifexModel.getOne({ project_id: project.id });
      const projectLanguages = await ProjectModel.getLanguages(project.id);
      const { projectSlug, resourceSlug, resourceLanguage } = projectTransifex;

      const languages = projectLanguages
        .filter((language) => language.languageCode !== resourceLanguage)
        .map((language) => language.id);

      if (!(projectSlug && resourceSlug && resourceLanguage)) {
        throw new NotFoundError('Project Transifex configurations not found');
      }

      const labelsMatched = await this.matchStringsWithTransifex({
        project_slug: projectSlug,
        resource_slug: resourceSlug,
        resource: resourceLanguage,
        merged_at,
        strings: labels
      });


      RequestModel.labels = labelsMatched;
      RequestModel.languages = languages;

      const [requestId] = await RequestModel.insert({
        project_id: project.id
      });

      const response = await RequestModel.getOne({ id: requestId });

      res.json(response);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  public async matchStringsWithTransifex(githubStrings: GithubStringsInterface): Promise<Array<LabelInterface>> {
    try {
      const { project_slug, resource_slug, resource, merged_at } = githubStrings;
      const response = await TransifexService.getStringsPeriod(project_slug, resource_slug, resource, merged_at, merged_at);
      const transifexResource: Array<TransifexResourceInterface> = response.data;
      const keys = TransifexUtils.matchKeysStrings(githubStrings, transifexResource);
      return Promise.resolve(keys);
    } catch (error) {
      throw new Error('Happened a error in match strings from GitHub Pull Request with Transifex');
    }
  }
}

export default new GitController();
