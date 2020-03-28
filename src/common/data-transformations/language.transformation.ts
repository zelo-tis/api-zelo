/* eslint-disable @typescript-eslint/no-explicit-any */
import { LanguageInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any): LanguageInterface => {
  const { description, languageCode } = body;

  return ObjectUtils.removeUndefinedAttributes({
    description,
    language_code: languageCode
  });
};
