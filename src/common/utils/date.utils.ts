import moment from 'moment';
export const getDateTimeString = (date: string) => String(date).replace('T', ' ').replace('Z', '');
import {CHANGE_RECORD_STATUS} from '../constants';
export const calcNextHour  = (date: Date, hours: number) => {
  moment(date).add(hours, 'hours').format('YYYY-MM-DD HH:MM');
};
const fixedNumber = (value: number) => Number(value.toFixed());

export const calcDeadline = (minutes: number, status: string = CHANGE_RECORD_STATUS.TODO) => {
  const deadline = {
    late: false,
    text: ''
  };
  if (minutes === null) return deadline;
  const hoursLimit = 1440;
  if (minutes < 0) {
    minutes = Math.abs(minutes);
    deadline.late = CHANGE_RECORD_STATUS.DONE !== status;
  }
  if (minutes >= hoursLimit) {
    const days = fixedNumber(minutes / hoursLimit);
    deadline.text = `${days} dia${days > 1 ? 's' : ''}`;
  } else if (minutes < hoursLimit && minutes > 59) {
    const hours = fixedNumber(minutes / 60);
    deadline.text = `${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes < 59 && minutes >= 0) {
    deadline.text = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }

  if (deadline.late) deadline.text = `${deadline.text} atrás`;
  return deadline;
};

