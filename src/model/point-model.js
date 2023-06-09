import {generatePoint} from '../mock/point';
import {getDestinations} from '../mock/destination';
import {getOffersByType} from '../mock/offer';

export default class PointModel {
  #points = Array.from({length:5}, generatePoint);
  #destinations = getDestinations();
  #offers = getOffersByType();
  get points(){
    return this.#points;
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }
}
