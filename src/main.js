import {render, RenderPosition} from './render';
import Trip from './presenter/trip';
import Filter from './view/filters';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
