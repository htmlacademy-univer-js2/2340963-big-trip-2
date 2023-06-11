import {getDestinations} from '../mock/destination';
import Observable from '../framework/observable';

export default class DestinationModel extends Observable{
  #destinations = getDestinations();
  get destinations(){
    return this.#destinations;
  }
}
