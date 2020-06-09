import moment from 'moment';
export const getDateTimeString = (date: string) => String(date).replace('T', ' ').replace('Z', '');
import {CHANGE_RECORD_STATUS} from '../constants';
export const calcNextHour  = (date: Date, hours: number) => {
  moment(date).add(hours, 'hours').format('YYYY-MM-DD HH:MM');
};
const fixedNumber = (value: number) => Number(value.toFixed());

export const calcDiff = (time: string) => moment.duration(moment(time).diff(moment())).asMinutes();

export const calcDeadline = (date: string, status: string = CHANGE_RECORD_STATUS.TODO) => {

 let minutes = calcDiff(date);

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
  const time = moment(date);

  deadline.text = time.calendar();
  return deadline;
};

