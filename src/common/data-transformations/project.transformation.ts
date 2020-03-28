/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectInterface, ProjectTransifexInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { description, githubRepo } = body;

  const project: ProjectInterface = {
    description,
    github_repo: githubRepo
  };

  let projectTransifex: ProjectTransifexInterface | undefined;

  if (body.transifex) {
    const {
      projectName,
      projectSlug,
      resourceName,
      resourceSlug,
      resourceLanguage
    } = body.transifex;

    projectTransifex = {
      project_name: projectName,
      project_slug: projectSlug,
      resource_name: resourceName,
      resource_slug: resourceSlug,
      resource_language: resourceLanguage
    };
  }

  let projectLanguages: number[] | undefined;

  if (Array.isArray(body.languages)) {
    projectLanguages = body.languages.map(
      (language_id: number) => +language_id
    );
  }

  return ObjectUtils.removeUndefinedAttributes({
    project,
    projectTransifex,
    projectLanguages
  });
};
