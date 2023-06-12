import Trip from './presenter/trip';
import PointModel from './model/point-model';
import Header from './presenter/header';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button';
import {render} from './framework/render';
import PointsApiService from './api-service/points-api-service';
import DestinationsApiService from './api-service/destinations-api-service';
import OffersApiService from './api-service/offers-api-service';

const AUTHORIZATION = 'Basic pkhS2sfY44wtl1se';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OfferModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
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

