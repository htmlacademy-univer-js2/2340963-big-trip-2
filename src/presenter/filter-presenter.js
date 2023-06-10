import FiltersView from '../view/filters';
import {render} from '../framework/render';
import MenuView from '../view/menu';

export default class filterPresenter{
  #headerContainer;
  #menuComponent;
  #points;
  #filter;

  constructor(headerContainer, filters, points){
    this.#headerContainer = headerContainer;
    this.#points = points;
    this.#menuComponent = new MenuView();
    this.#filter = new FiltersView(filters);
  }

  init(){
    if (this.#points.length !== 0) {
      render(new TripInfoView(this.#points), this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
    render(this.#filter, this.#headerContainer.querySelector('.trip-controls__filters'));
  }
}
