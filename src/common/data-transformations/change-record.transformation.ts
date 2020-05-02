/* eslint-disable @typescript-eslint/no-explicit-any */
import {  } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { startDate, endDate } = body;
  const period = {
    startDate,
    endDate
  };

  return ObjectUtils.removeUndefinedAttributes({

  });
};
