import Trip from './presenter/trip';
import PointModel from './model/point-model';
import {generateFilters} from './mock/filter';
import Header from './presenter/header';

const tripContainer = document.querySelector('.trip-events');
const pointsModel = new PointModel();
const tripPresenter = new Trip({container: tripContainer, pointsModel: pointsModel});

const headerContainer = document.querySelector('.trip-main');
const filters = generateFilters(pointsModel.points);
const headerPresenter = new Header(headerContainer, filters, pointsModel.points, pointsModel.destinations);
headerPresenter.init();
tripPresenter.init();

