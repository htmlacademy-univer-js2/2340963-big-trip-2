import {getRandomInteger} from '../utils/common';
import {DESTINATION_CITIES, DESTINATION_DESCRIPTIONS} from '../const';

const generateDescription = () => {
  let description = '';
  description = DESTINATION_DESCRIPTIONS[getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1)];
  return description;
};

const getPictures = () => {
  const destPictures = [];
  for(let i = 1; i < getRandomInteger(2,4); i++){
    destPictures.push({
      src: `img/photos/${getRandomInteger(1,5)}.jpg`,
      description: generateDescription()
    });
  }
  return destPictures;
};

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: DESTINATION_CITIES[id],
  pictures: getPictures()
});

export const getDestinations = () => Array.from({length: DESTINATION_CITIES.length}).map((name, id) => generateDestination(id));

export const destinations = getDestinations();
