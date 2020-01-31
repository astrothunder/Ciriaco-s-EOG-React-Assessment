import {
  GET_METRICS,
  SELECT_METRICS,
  METRIC_API_ERROR_RECEIVED,
  GET_MULTIPLE_MEASUREMENTS,
  UPDATE_HISTORY,
  UNSELECT_METRICS,
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

export const updateHistory = (metric, measurement) => {
  return {
    type: UPDATE_HISTORY,
    metric: metric,
    measurement: measurement,
  };
};

export const selectMetrics = metric => {
  return {
    type: SELECT_METRICS,
    metric: metric,
  };
};

export const unselectMetrics = metric => {
  return {
    type: UNSELECT_METRICS,
    metric: metric,
  };
};

export const getMetrics = metrics => {
  return {
    type: GET_METRICS,
    metrics: metrics,
  };
};
