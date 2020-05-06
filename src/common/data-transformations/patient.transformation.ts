/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeRecordInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const {attendance_number} = body;

  return ObjectUtils.removeUndefinedAttributes({
    ...body,
    attendance_number: attendance_number ? Number(attendance_number) : undefined
  });
};
