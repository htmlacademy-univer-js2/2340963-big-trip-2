import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomItem} from '../utils/common';
import {destinations} from './destination';
import {getOffersByType} from './offer';

const generateFavorite = () => {
  const g = getRandomInteger(1,2);
  return g === 1;
};

const offersByType = getOffersByType();

export const generatePoint = () => {
  const offersByTypePoint = getRandomItem(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    id: nanoid(),
    destinationId: getRandomItem(destinations).id,
    startDate: `2019-07-10T${getRandomInteger(10, 23)}:${getRandomInteger(10, 59)}:00.845Z`,
    endDate: `2019-07-11T${getRandomInteger(10, 23)}:${getRandomInteger(10, 59)}:00.375Z`,
    price: getRandomInteger(200,1000),
    isFavorite: generateFavorite(),
    arrayOffersIds: Array.from({length: getRandomInteger(0, allOfferIdsByTypePoint.length)}).map(() =>
      allOfferIdsByTypePoint[getRandomInteger(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type
  };
};
