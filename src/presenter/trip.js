import {render, RenderPosition, replace} from '../framework/render';
import TripList from '../view/trip-list';
import Sorting from '../view/sorting';
import PointView from '../view/point';
import EditingPointView from '../view/editing-point';
import NoPointView from '../view/no-point';

class Trip{
  #container = null;
  #pointsModel = null;
  #component = new TripList();
  #tripPoints = [];
  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #renderPoint = (point, editPoint) => {
    const onEscKeyDown = (event) => {
      if(event.key === 'Escape' || event.key === 'Esc'){
        event.preventDefault();
        replaceEditPointToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToEditPoint.call(this);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const editPointComponent = new EditingPointView({
      editPoint,
      onFormSubmit: () => {
        replaceEditPointToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });
    function replacePointToEditPoint() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditPointToPoint() {
      replace(pointComponent, editPointComponent);
    }
    render(pointComponent, this.#component.element);
  };

  #renderBoard = () => {
    if(this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#container);
      return;
    }
    render(new Sorting(), this.#container, RenderPosition.BEFOREEND);
    render(this.#component, this.#container);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i], this.#tripPoints[0]);
    }
  };
}

export default Trip;
