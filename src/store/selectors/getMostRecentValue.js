import { createSelector } from 'reselect';

const state = state => state.metrics;

const getMostRecentValue = () =>
  createSelector(
    state,
    (state, metric) => {
      return metric;
    },
    (state, metric) => {
      if (state.metricHistory[metric]) {
        return state.metricHistory[metric][state.metricHistory[metric].length - 1].value;
      } else {
        return '---';
      }
    },
  );

export default getMostRecentValue;
