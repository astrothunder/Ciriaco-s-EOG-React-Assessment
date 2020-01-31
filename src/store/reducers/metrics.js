import {
  GET_METRICS,
  SELECT_METRICS,
  GET_MULTIPLE_MEASUREMENTS,
  UPDATE_HISTORY,
  UNSELECT_METRICS,
} from '../actions/actionTypes';

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
      let measurement = action.measurement;

      let updatedHistory = state.metricHistory;

      let newData = updatedHistory[metricName];

      if (newData) {
        let time = new Date(measurement.at);
        time = time.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute: '2-digit',
        });
        newData.push({ time: time, value: measurement.value, unit: measurement.unit });

        updatedHistory[metricName] = newData;

        return {
          ...state,

          metricHistory: updatedHistory,
        };
      }

      return {
        ...state,
      };
    case GET_MULTIPLE_MEASUREMENTS:
      let data = action.data;

      let history = {};

      data.map(obj => {
        let data = [];
        if (obj.measurements) {
          obj.measurements.map(obj => {
            let time = new Date(obj.at);
            time = time.toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            });

            console.log(time);
            data.push({ time: time, value: obj.value, unit: obj.unit });
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
      let updatedMetrics = [...state.selectedMetrics];

      updatedMetrics.push(action.metric);

      return {
        ...state,
        selectedMetrics: updatedMetrics,
      };
    case UNSELECT_METRICS:
      let oldMetrics = [...state.selectedMetrics];

      let unselectOldMetrics = oldMetrics.filter(metric => metric !== action.metric);

      return {
        ...state,
        selectedMetrics: unselectOldMetrics,
      };

    default:
      return state;
  }
};

export default reducer;
