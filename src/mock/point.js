import {generateDestination} from './destination';
import {TYPES} from './const';
import {getRandomInteger} from '../utils';

const generateType = () => {
  const types = TYPES;
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

export const generatePoint = () => ({
  type: generateType(),
  destination: generateDestination(),
  startDate: '2019-07-10T22:55:56.845Z',
  endDate: '2019-07-11T11:22:13.375Z',
  cost: 20,
  offers: [1]
});
