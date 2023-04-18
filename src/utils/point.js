import dayjs from 'dayjs';

export const humanizePointDate = (date, form) => dayjs(date).format(form);
export const createDuration = (startDate, endDate, param) => dayjs(endDate).diff(startDate, param);


