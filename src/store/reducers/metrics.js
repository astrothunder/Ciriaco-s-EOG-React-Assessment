import { GET_METRICS, SELECT_METRICS, GET_MULTIPLE_MEASUREMENTS, UPDATE_HISTORY } from '../actions/actionTypes';

const initialState = {
  selectedMetrics: [],
  allMetrics: [],
  metricHistory: [],
  chartTime: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICS:
      let newMetrics = [];
      action.metrics.map(metric => {
        newMetrics.push(metric);
        return true;
      });
      return {
        ...state,
        allMetrics: newMetrics,
      };
    case UPDATE_HISTORY:
      let metricName = action.metric;
      let value = action.value;

      let updatedHistory = state.metricHistory;

      let newData = updatedHistory[metricName];

      newData.push(value);

      updatedHistory[metricName] = newData;

      return {
        ...state,
        metricHistory: updatedHistory,
      };
    case GET_MULTIPLE_MEASUREMENTS:
      let data = action.data.getMultipleMeasurements;

      let history = {};

      data.map(obj => {
        let data = [];
        if (obj.measurements) {
          obj.measurements.map(obj => {
            data.push({ x: new Date(obj.at), y: obj.value });
            return true;
          });

          history[obj.metric] = data;
        }
        return true;
      });

      if (data.length > 0) {
        return {
          ...state,
          metricHistory: history,
        };
      }
      return {
        ...state,
      };

    case SELECT_METRICS:
      let updatedMetrics = [];

      if (action.metrics) {
        action.metrics.map(metric => {
          return updatedMetrics.push(metric.value);
        });
      } else {
        updatedMetrics = [];
      }

      return {
        ...state,
        selectedMetrics: updatedMetrics,
      };

    default:
      return state;
  }
};

export default reducer;
