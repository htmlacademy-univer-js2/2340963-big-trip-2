import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventTime, getEarliestEvent, getLatestEvent } from '../utils/event-date.js';

const getOverallSum = (points) => {
  let sum = 0;
  for(const point of points) {
    sum += point.price;
  }
  return sum;
};

const getTripTitle = (points, startPoint, endPoint) => {
  switch(points.length) {
    case 1:
      return startPoint.destination.city;

    case 2:
      return `${startPoint.destination.city} &mdash; ${endPoint.destination.city}`;

    case 3:
      return `${startPoint.destination.city} &mdash; ${points.find((point) => point.id !== startPoint.id && point.id !== endPoint.id).destination.city} &mdash; ${endPoint.destination.city}`;

    default:
      return `${startPoint.destination.city} &mdash; . . . &mdash; ${endPoint.destination.city}`;
  }
};

const createTripInfoTemplate = (points) => {
  const earliestPoint = getEarliestEvent(points);
  const latestPoint = getLatestEvent(points);

  return(
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitle(points, earliestPoint, latestPoint)}</h1>
        <p class="trip-info__dates">${humanizeEventTime(earliestPoint.startDate, 'MMM D')}&nbsp;&mdash;&nbsp;${humanizeEventTime(latestPoint.endDate, 'MMM D')}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getOverallSum(points)}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor (points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
