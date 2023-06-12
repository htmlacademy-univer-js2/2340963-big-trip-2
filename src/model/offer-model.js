import {getOffersByType} from '../mock/offer';
import Observable from '../framework/observable';

export default class OfferModel extends Observable{
  #offersApiService = null;
  #offers = getOffersByType();
  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;

    this.#offersApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get offers(){
    return this.#offers;
  }
}
