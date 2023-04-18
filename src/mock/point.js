import {TYPES} from './const';
import {getRandomInteger} from '../utils/common';


const generateType = () => {
  const types = TYPES;
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateFavorite = () => {
  const g = getRandomInteger(1,2);
  return g === 1;
};

export const generatePoint = () => ({
  type: generateType(),
  destination: getRandomInteger(1,2),
  startDate: `2019-07-10T${getRandomInteger(10, 23)}:${getRandomInteger(10, 59)}:00.845Z`,
  endDate: `2019-07-11T${getRandomInteger(10, 23)}:${getRandomInteger(10, 59)}:00.375Z`,
  price: getRandomInteger(200,1000),
  isFavorite: generateFavorite(),
  offers: [1]
});
