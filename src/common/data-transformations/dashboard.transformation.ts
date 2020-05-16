/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeRecordInterface } from '../interfaces/database';
import ObjectUtils from '../utils/object.utils';

export default (body: any) => {
  const { startDate, endDate, now, patientId, station, status, late } = body;
  const changeRecord ={
    't.patient_id': patientId
  };
  let period;

  if(startDate && endDate){
    period= {
      startDate,
      endDate
    }
  }
  const arrayStatus = status ? JSON.parse(status) : status;
  return ObjectUtils.removeUndefinedAttributes({
    changeRecord,
    custom: {
    period,
    now, station, status: arrayStatus, late
  }
  });
};
