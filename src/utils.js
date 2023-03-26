import dayjs from 'dayjs';

export const humanizePointDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const createDuration = (startDate, endDate) => {
  const stDate = dayjs(startDate);
  const enDate = dayjs(endDate);
  const days = enDate.diff(stDate, 'days');
  const hours = enDate.diff(stDate, 'hours') - days * 24;
  const minutes = enDate.diff(stDate, 'minutes') - hours * 60;
  return `${days}D ${hours}H ${minutes}M`;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
