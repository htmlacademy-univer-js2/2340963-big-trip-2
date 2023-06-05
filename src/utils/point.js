import dayjs from 'dayjs';

export const humanizePointDate = (date, form) => dayjs(date).format(form);
const createDuration = (startDate, endDate, param) => dayjs(endDate).diff(startDate, param);

const formattingDate = (diffDate) => diffDate < 10 ? `0${diffDate}` : `${diffDate}`;
export const calculateDuration = (startDate, endDate) => {
  const differenceDays = formattingDate(createDuration(startDate, endDate, 'day'));
  const differenceHours = formattingDate(createDuration(startDate, endDate, 'hour') - differenceDays * 24);
  const differenceMinutes = formattingDate(createDuration(startDate, endDate, 'minute') - differenceDays * 24 * 60 - differenceHours * 60 + 1);
  if (startDate === null || endDate === null){
    return null;
  }
  if (differenceDays !== '00') {
    return `${differenceDays}D ${differenceHours}H ${differenceMinutes}M`;
  }

  if (differenceHours !== '00') {
    return `${differenceHours}H ${differenceMinutes}M`;
  }
  return `${differenceMinutes}M`;
};

// const getWeightForNullDuration = (valueA, valueB) => {
//   if (valueA === null && valueB === null) {
//     return 0;
//   }
//
//   if (valueA === null) {
//     return 1;
//   }
//
//   if (valueB === null) {
//     return -1;
//   }
//
//   return null;
// };

// const getWeightForPrice = (priceA, priceB) => {
//   if (priceA === priceB) {
//     return 0;
//   }
//   if (priceA > priceB) {
//     return 1;
//   }
//   if (priceB > priceA) {
//     return -1;
//   }
// };

export const sortPointTime = (pointA, pointB) => dayjs(pointB.endDate).diff(dayjs(pointB.startDate)) - dayjs(pointA.endDate).diff(dayjs(pointA.startDate));

export const sortPointDay = (pointA, pointB) => {
  const dateFromDifference = dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
  return dateFromDifference === 0 ? dayjs(pointB.endDate).diff(dayjs(pointA.endDate)) : dateFromDifference;
};

