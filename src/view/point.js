import AbstractView from '../framework/view/abstract-view';
import {createDuration, humanizePointDate} from '../utils/point';
import {generateOffersByType} from '../mock/offer';
import {generateDestination} from '../mock/destination';

export const Point = (point) => {
  const {type, destination, startDate, endDate, price, isFavorite, offers} = point;
  const dateFrom = startDate !== null ? humanizePointDate(startDate, 'DD/MM/YY HH:mm') : '';
  const dateTo = endDate !== null ? humanizePointDate(endDate, 'DD/MM/YY HH:mm') : '';
  const date = startDate !== null ? humanizePointDate(startDate, 'D MMMM') : '';
  const getDestination = destination !== 0 ? generateDestination.find((x) => x.id === destination) : '';
  const city = getDestination !== '' ? getDestination.city : '';
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const formattingDate = (diffDate) => diffDate < 10 ? `0${diffDate}` : `${diffDate}`;
  const calculateDuration = () => {
    const differenceDays = formattingDate(createDuration(startDate, endDate, 'day'));
    const differenceHours = formattingDate(createDuration(startDate, endDate, 'hour') - differenceDays * 24);
    const differenceMinutes = formattingDate(createDuration(startDate, endDate, 'minute') - differenceDays * 24 * 60 - differenceHours * 60 + 1);
    if (startDate === null || endDate === null){
      return '';
    }
    if (differenceDays !== '00') {
      return `${differenceDays}D ${differenceHours}H ${differenceMinutes}M`;
    }

    if (differenceHours !== '00') {
      return `${differenceHours}H ${differenceMinutes}M`;
    }
    return `${differenceMinutes}M`;
  };
  const generateOffers = (offer) => {
    if (offers.find((x) => x === offer.id)) {
      return(`<li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>`);
    } else {
      return '';
    }
  };
  const createOffersTemplates = () => {
    if(offers.length !== 0) {
      let offersTemplates = '';
      const offersByType = generateOffersByType().find((x) => x.type === type);
      for (let i = 0; i < offersByType.offers.length; i++) {
        offersTemplates += generateOffers(offersByType.offers[i]);
      }
      return offersTemplates;
    } else {
      return '';
    }
  };
  return(`<li class="trip-events__item">
        <div class="event">
          <time class="event__date" dateTime="2019-03-18">${date}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${city}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" dateTime="2019-03-18T10:30">${dateFrom}</time>
              &mdash;
              <time class="event__end-time" dateTime="2019-03-18T11:00">${dateTo}</time>
            </p>
            <p class="event__duration">${calculateDuration()}</p>
          </div>
          <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${createOffersTemplates()}
          </ul>
          <button class="event__favorite-btn ${favoriteClass}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path
                d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
  </li>`);
};

export default class PointView extends AbstractView{
  #point = null;
  #handleEditClick = null;
  constructor({point, onEditClick}){
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template(){
    return Point(this.#point);
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#handleEditClick();
  };
}
