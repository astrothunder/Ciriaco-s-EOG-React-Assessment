import { GET_METRICS, SELECT_METRICS, METRIC_API_ERROR_RECEIVED } from './actionTypes';
import { useQuery } from 'urql';

export const metricApiErrorReceived = error => {
  return {
    type: METRIC_API_ERROR_RECEIVED,
    error: error,
  };
};

export const selectMetrics = error => {
  return {
    type: SELECT_METRICS,
  };
};

export const getMetrics = () => {
  return dispatch => {
    return {
      type: GET_METRICS,
    };
  };
};
