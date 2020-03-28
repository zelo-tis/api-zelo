import { GitPRLabelsInterface } from './git-pr-labels.interface';

export interface GithubStringsInterface {
    project_slug: string;
    resource_slug: string;
    resource: string;
    merged_at: string;
    strings: Array<GitPRLabelsInterface>;
  }
