import {generatePoint} from '../mock/point';

export default class PointModel {
  getPoints(){
    this.points = Array.from({length:5}, generatePoint);
    return this.points;
  }
}
