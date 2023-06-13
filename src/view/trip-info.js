import AbstractView from '../framework/view/abstract-view.js';
import {getEndPoint, getStartPoint} from '../utils/common';
import {humanizePointDate} from '../utils/point';

const getTotalAmount = (points, offers) => {
  let sum = 0;
  let sumOffersCurrPoint = 0;
  let checkedOffers = [];
  let offersByType;
  points.forEach((point) => {
    sumOffersCurrPoint = 0;
    checkedOffers = point.offers;
    offersByType = offers.find((offer) => offer.type === point.type);
    if (checkedOffers.length !== 0){
      checkedOffers.forEach((checked) => {
        sumOffersCurrPoint += offersByType.offers.find((offer) => offer.id === checked).price;
      });
    }
    sum += point.price + sumOffersCurrPoint;
  });
  return sum;
};

const getTripTitle = (points, destinations, startPoint, endPoint) => {
  const destinationStart = destinations.find((dest) => dest.id === startPoint.destination);
  const destinationEnd = destinations.find((dest) => dest.id === endPoint.destination);
  const destination = destinations.find((dest) => dest.id === points.find(
    (point) => point.id !== startPoint.id && point.id !== endPoint.id).destination);
  switch(points.length) {
    case 1:
      return destinationStart.name;

    case 2:
      return `${destinationStart.name} &mdash; ${destinationEnd.name}`;

    case 3:
      return `${destinationStart.name} &mdash;
      ${destination.name} &mdash;
    ${destinationEnd.name}`;

    default:
      return `${destinationStart.name} &mdash; . . . &mdash; ${destinationEnd.name}`;
  }
};

const createTripInfoTemplate = (points, destinations, offers) => {
  const startPoint = getStartPoint(points);
  const endPoint = getEndPoint(points);

  return(
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitle(points, destinations, startPoint, endPoint)}</h1>
        <p class="trip-info__dates">${humanizePointDate(startPoint.startDate, 'MMM D')}&nbsp;&mdash;&nbsp;${humanizePointDate(endPoint.endDate, 'MMM D')}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalAmount(points, offers)}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor ({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
