import {render, RenderPosition} from '../render';
import TripList from '../view/trip-list';
import Sorting from '../view/sorting';
import PointView from '../view/point';
import EditingPointView from '../view/editing-point';

class Trip{
  constructor({container}) {
    this.component = new TripList();
    this.container = container;
  }

  #pointsModel = null;
  #tripPoints = [];

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#tripPoints = [...this.#pointsModel.points];
    render(new Sorting(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditingPointView(point);
    const replacePointToEditPoint = () => {
      this.component.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditPointToPoint = () => {
      this.component.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (event) => {
      if(event.key === 'Escape' || event.key === 'Esc'){
        event.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (event) => {
      event.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.component.element);
  };
}

export default Trip;
