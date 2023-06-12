import {getDestinations} from '../mock/destination';
import Observable from '../framework/observable';

export default class DestinationModel extends Observable{
  #destinationsApiService = null;
  #destinations = getDestinations();
  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations) => {
      console.log(destinations);
    });
  }

  get destinations(){
    return this.#destinations;
  }
}
