import {createElement} from '../render';

const createTripList = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripList{
  #element = null;
  get template(){
    return createTripList();
  }

  get element(){
    if(!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}

export default TripList;
