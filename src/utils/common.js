import {sortPointDay, sortPointTime} from './point';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updatePoint = (points, updatedPoint) => {
  const index = points.findIndex((item) => item.id === updatedPoint.id);

  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    updatedPoint,
    ...points.slice(index + 1),
  ];
};


export const SORTTYPE = {
  DEFAULT: 'day',
  TIME: 'time-descending',
  PRICE: 'price-descending'
};

export const sortPointsByType = {
  [SORTTYPE.DEFAULT]: (points) => points.sort(sortPointDay),
  [SORTTYPE.TIME]: (points) => points.sort(sortPointTime),
  [SORTTYPE.PRICE]: (points) => points.sort((pointA, pointB) => pointB.price - pointA.price)
};

