import {generatePoint} from '../mock/point';

export default class PointModel {
  #points = Array.from({length:5}, generatePoint);
  get points(){
    return this.#points;
  }
}
