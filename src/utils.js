import dayjs from 'dayjs';

export const humanizePointDate = (date, form) => dayjs(date).format(form);
export const createDuration = (startDate, endDate, param) => dayjs(endDate).diff(startDate, param);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
