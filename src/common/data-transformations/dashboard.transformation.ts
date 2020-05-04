/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeRecordInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { period, now, patientId } = body;
  const changeRecord ={
    't.patient_id': patientId
  };
  return ObjectUtils.removeUndefinedAttributes({
    changeRecord,
    custom: {
    period,
    now
  }
  });
};
