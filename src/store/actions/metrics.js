import {
  GET_METRICS,
  SELECT_METRICS,
  METRIC_API_ERROR_RECEIVED,
  GET_MULTIPLE_MEASUREMENTS,
  UPDATE_HISTORY,
} from './actionTypes';
import { useQuery } from 'urql';

export const metricApiErrorReceived = error => {
  return {
    type: METRIC_API_ERROR_RECEIVED,
    error: error,
  };
};

export const getMultipleMeasurements = data => {
  return {
    type: GET_MULTIPLE_MEASUREMENTS,
    data: data,
  };
};

export const updateHistory = (metric, value) => {
  return {
    type: UPDATE_HISTORY,
    metric: metric,
    value: value,
  };
};

export const selectMetrics = error => {
  return {
    type: SELECT_METRICS,
  };
};

export const getMetrics = metrics => {
  return {
    type: GET_METRICS,
    metrics: metrics,
  };
};
