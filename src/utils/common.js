import {sortPointDay, sortPointTime} from './point';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updatePoint = (points, update) => points.map((point) => point.id === update.id ? update : point);

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

