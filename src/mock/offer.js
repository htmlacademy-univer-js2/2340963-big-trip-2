import {OFFERSBYTYPE, TYPES} from './const';
import {getRandomInteger} from '../utils';

const generateTitlePrice = () => OFFERSBYTYPE[getRandomInteger(OFFERSBYTYPE.length - 1)];
const generateOffer = (id) => ({
  id: id,
  title: generateTitlePrice(),
  price: getRandomInteger(10, 100)
});

export const generateOffersByType = () => {
  const offersByType = [];
  for(let i = 0; i < TYPES.length; i++){
    offersByType.push({
      type: TYPES[i],
      offers: [generateOffer(1), generateOffer(2), generateOffer(3)]
    });
  }
  return offersByType;
};
