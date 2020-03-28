import {
  RequestPictureInterface,
  LabelInterface
} from '../interfaces/database';
import Transifex from '../services/transifex.service';
import { GithubStringsInterface } from '../interfaces/github-strings.interface';
import { TransifexResourceInterface } from '../interfaces/transifex-resource.interface';

export const mapScreenshots = (
  resourceSlug: string,
  projectSlug: string,
  pictures: RequestPictureInterface[],
  labels: LabelInterface[]
) => {
  const promiseList = pictures.map(async (picture) => {
    if (!picture.url) return null;
    if (!picture.transifex_id) return null;

    const mappingData = labels.map((label) => ({
      resource_slug: resourceSlug,
      source_string_hash: label.key || ''
    }));

    return Transifex.mappingStringsToScreenshot(
      projectSlug,
      picture.transifex_id,
      mappingData
    );
  });

  return Promise.all(promiseList);
};

export const matchKeysStrings = (
  githubStrings: GithubStringsInterface,
  transifexResource: Array<TransifexResourceInterface>
): Array<LabelInterface> => {
  let newsKeys: LabelInterface[] = [];
  for (const filePR of githubStrings.strings) {
    for (const string of filePR.strings) {
      const keysFind = transifexResource.filter(
        (item) => item.source_string === string.text
      );
      for (const keyFind of keysFind) {
        const { key, source_string, string_hash } = keyFind;
        const label: LabelInterface = {
          key,
          text: source_string,
          hash: string_hash
        };
        newsKeys = newsKeys.concat(label);
      }
    }
  }
  return newsKeys;
};
