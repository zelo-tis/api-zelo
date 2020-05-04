/* eslint-disable @typescript-eslint/no-explicit-any */
import {RestrictionInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { } = body;
  const data: RestrictionInterface ={
  };
  return ObjectUtils.removeUndefinedAttributes({
    ...data
  });
};
