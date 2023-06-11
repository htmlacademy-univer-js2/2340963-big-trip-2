import {getOffersByType} from '../mock/offer';
import Observable from '../framework/observable';

export default class OfferModel extends Observable{
  #offers = getOffersByType();

  get offers(){
    return this.#offers;
  }
}
