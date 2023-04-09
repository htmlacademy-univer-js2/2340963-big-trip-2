import {render, RenderPosition} from './render';
import Trip from './presenter/trip';
import Filter from './view/filters';
import PointModel from './model/point-model';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointModel();
const tripPresenter = new Trip({container: tripContainer, pointsModel: pointsModel});

render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
