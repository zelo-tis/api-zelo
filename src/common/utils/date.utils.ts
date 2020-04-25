import moment from 'moment';
export const getDateTimeString = (date: string) => String(date).replace('T', ' ').replace('Z', '');

export const calcNextHour  = (date: Date, hours: number) => {
  moment(date).add(hours, 'hours').format('YYYY-MM-DD HH:SS');
};
