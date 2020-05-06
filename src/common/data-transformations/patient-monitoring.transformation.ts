/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeRecordInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  return ObjectUtils.removeUndefinedAttributes({
   ...body
  });
};
