/* eslint-disable @typescript-eslint/no-explicit-any */
import {  } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { period, now } = body;

  return ObjectUtils.removeUndefinedAttributes({
    period,
    now
  });
};
