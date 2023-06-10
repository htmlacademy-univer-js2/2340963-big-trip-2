import AbstractView from '../framework/view/abstract-view';
import {upperFirst} from '../utils/common';

const createFilters = (filters) => {
  const createFiltersElements = () => {
    let filtersTemplates = '';
    filters.map((filter, index) => {
      const {type, count} = filter;
      const checked = index === 0 ? 'checked' : '';
      const disabled = count === 0 ? 'disabled' : '';
      filtersTemplates += `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
        value="${type}" ${checked} ${disabled}>
        <label class="trip-filters__filter-label" for="filter-${filter}">${upperFirst(type)}</label>
        </div>`;
    }).join('');
    return filtersTemplates;
  };
  return(`<form class="trip-filters" action="#" method="get">
      ${createFiltersElements()}
      <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`);
};
export default class FiltersView extends AbstractView{
  #filters = null;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template(){
    return createFilters(this.#filters);
  }
}
