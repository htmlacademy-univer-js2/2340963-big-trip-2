import FiltersView from '../view/filters';
import {render, RenderPosition} from '../framework/render';
import MenuView from '../view/menu';
import TripInfoView from '../view/trip-info';

export default class Header{
  #headerContainer = null;
  #menuComponent = null;
  #points = null;
  #destinations = null;
  #filterComponent;

  constructor(headerContainer, filters, points, destinations){
    this.#headerContainer = headerContainer;
    this.#points = points;
    this.#destinations = destinations;
    this.#menuComponent = new MenuView();
    this.#filterComponent = new FiltersView(filters);
  }

  init(){
    if (this.#points.length !== 0) {
      render(new TripInfoView(this.#points, this.#destinations), this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
    render(this.#menuComponent, this.#headerContainer.querySelector('.trip-controls__navigation'));
    render(this.#filterComponent, this.#headerContainer.querySelector('.trip-controls__filters'), RenderPosition.BEFOREEND);
  }
}
