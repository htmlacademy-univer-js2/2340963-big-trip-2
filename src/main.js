import Trip from './presenter/trip';
import PointModel from './model/point-model';
import Header from './presenter/header';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button';
import {render} from './framework/render';

const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointModel();
const destinationsModel = new DestinationModel();
const offersModel = new OfferModel();
const filtersModel = new FilterModel();
const tripPresenter = new Trip({
  container: tripContainer,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filtersModel: filtersModel,
  onNewPointDestroy: handleNewPointClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: headerContainer.querySelector('.trip-controls__filters'),
  filterModel: filtersModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, headerContainer);

const headerPresenter = new Header(headerContainer, pointsModel.points, destinationsModel.destinations);
headerPresenter.init();
filterPresenter.init();
tripPresenter.init();

