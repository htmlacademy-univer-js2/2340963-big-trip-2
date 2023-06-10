import {filterByType} from '../utils/filter';

export const generateFilters = (points) => Object.entries(filterByType).map(
  ([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length
  })
);
