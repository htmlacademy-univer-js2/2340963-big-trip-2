import {getRandomInteger} from '../utils/common';
import {DESTINATION_CITIES, DESTINATION_DESCRIPTIONS} from '../utils/const';

const generateDescription = () => {
  let description = '';
  description = DESTINATION_DESCRIPTIONS[getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1)];
  return description;
};

const getPhotos = () => {
  const destPhotos = [];
  for(let i = 1; i < getRandomInteger(2,4); i++){
    destPhotos.push({
      src: `img/photos/${getRandomInteger(1,5)}.jpg`,
      description: generateDescription()
    });
  }
  return destPhotos;
};

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  city: DESTINATION_CITIES[id],
  photos: getPhotos()
});

export const getDestinations = () => Array.from({length: DESTINATION_CITIES.length}).map((city, id) => generateDestination(id));

export const destinations = getDestinations();
