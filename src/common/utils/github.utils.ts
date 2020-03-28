import { GITHUB_HOOK_EVENTS, GITHUB_REQUEST_EVENTS, GIBHUB_ACTIONS } from '../constants/index';
import GitHub from '../services/github.service';
import ExtractLabelsFromGitDiff from './class/extract-labels-from-git-diff';
import CONFIG from '../config';

export const deleteAndInsertNewHook = async (oldRepo?: string, oldHookId?: number, newRepo?: string, eventUrl?: string) => {
  let github_hook_id;

  if (process.env.NODE_ENV === 'development') return undefined;

  const changedProjectRepo = oldRepo != newRepo;

  if (changedProjectRepo && oldHookId && oldRepo) {
    await GitHub.deleteAHook(oldRepo, oldHookId);
  }

  if (newRepo) {
    const hookInsertResponse = await GitHub.createAHook(newRepo, {
      events: [GITHUB_HOOK_EVENTS.PULL_REQUEST],
      config: {
        url: eventUrl,
        content_type: 'json'
      }
    });
    github_hook_id = hookInsertResponse.id ? +hookInsertResponse.id : 0;
  }

  return github_hook_id;
};

export const extractLabels = (content: string) => {
  const instance = new ExtractLabelsFromGitDiff(content);
  return instance.extractLabels();
};

export const checkEventIsMergedPullRequest = (event: any) => {
  const labels: string[] = event.payload.pull_request.labels || [];

  const isPREvent = event.type === GITHUB_REQUEST_EVENTS.PULL_REQUEST;
  const isClosed = event.payload.action === GIBHUB_ACTIONS.CLOSED;
  const isMerged = !!event.payload.pull_request.merged;
  const isBranchMaster = event.payload.pull_request.head.repo.default_branch === CONFIG.git.branch;
  const hasTranslateLabel = labels.indexOf(CONFIG.git.label) !== -1;

  return isPREvent && isClosed && isMerged && isBranchMaster && hasTranslateLabel;
};
