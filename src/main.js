import {render, RenderPosition} from './render';
import Trip from './presenter/trip';
import Filter from './view/filters';
import PointModel from './model/point-model';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

const pointsModel = new PointModel();

render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init(pointsModel);
