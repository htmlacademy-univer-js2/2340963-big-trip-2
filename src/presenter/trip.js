import {render, RenderPosition} from '../framework/render';
import TripList from '../view/trip-list';
import Sorting from '../view/sorting';
import NoPointView from '../view/no-point';
import PointPresenter from './point-presenter';
import {updatePoint} from '../utils/common';

class Trip{
  #container = null;
  #pointsModel = null;
  #component = new TripList();
  #sortComponent = new Sorting();
  #noPoint = new NoPointView();
  #tripPoints = [];
  #pointPresenter = new Map();
  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updatePoint(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#container, RenderPosition.BEFOREEND);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#component.element,
      onFavoriteChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderNoPoints() {
    render(this.#noPoint, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    render(this.#component, this.#container);
    this.#renderPoints();
  }

  #renderBoard() {
    if(this.#tripPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  }
}

export default Trip;
