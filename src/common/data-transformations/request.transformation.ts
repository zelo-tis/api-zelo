/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestInterface, LabelInterface, PRInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { projectId, deliveryDate, feature, description, info, status } = body;
  let pullRequest: PRInterface | undefined;

  const request: RequestInterface = {
    project_id: projectId,
    delivery_date: deliveryDate,
    feature,
    description,
    info,
    status
  };

  if (body.pullRequest) {
    const { userId, repoId, pullRequestId, mergedAt } = body.pullRequest;

    pullRequest = {
      github_user_id: userId,
      github_repo_id: repoId,
      github_pr_id: pullRequestId,
      merged_at: mergedAt
    };
  }

  let languages: number[] | undefined;
  let labels: LabelInterface[] | undefined;

  if (Array.isArray(body.languages)) {
    languages = body.languages.map((language_id: number) => +language_id);
  }

  if (Array.isArray(body.labels)) {
    labels = body.labels.map((label: any) => {
      const { key, text, hash } = label;
      return { key, text, hash };
    });
  }

  return ObjectUtils.removeUndefinedAttributes({
    request,
    labels,
    languages,
    pullRequest
  });
};
