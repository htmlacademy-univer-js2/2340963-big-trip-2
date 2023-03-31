const getPhotos = () => {
  const destPhotos = [];
  for(let i = 1; i < 6; i++){
    destPhotos.push(`img/photos/${i}.jpg`);
  }
  return destPhotos;
};

export const generateDestination = [
  {
    id: 1,
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, ' +
      'Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    city: 'Chamonix',
    photos: [...getPhotos()],
  },
  {
    id: 2,
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). ' +
      'Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    city: 'Geneva',
    photos: [...getPhotos()],
  }
];
