import {render, RenderPosition} from '../render';
import TripList from '../view/trip-list';
import Sorting from  '../view/sorting';
import PointNew from '../view/new-point';
import PointEdit from '../view/editing-point';
import Point from '../view/point';

class Trip{
  constructor({container}) {
    this.component = new TripList();
    this.container = container;
  }

  init(pointsModel) {
    render(new Sorting(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointNew(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new PointEdit(), this.component.getElement(), RenderPosition.BEFOREEND);
    this.pointsModel = pointsModel;
    this.tripPoints = [...this.pointsModel.getPoints()];

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new Point(this.tripPoints[i]), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
