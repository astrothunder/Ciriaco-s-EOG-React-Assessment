import { GET_METRICS, SELECT_METRICS } from '../actions/actionTypes';

const initialState = {
  selectedMetrics: [],
  allMetrics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICS:
      let newMetrics = [];
      action.metrics.map(metric => {
        newMetrics.push(metric);
      });
      return {
        ...state,
        allMetrics: newMetrics,
      };

    case SELECT_METRICS:
      let updatedMetrics = [];

      if (action.metrics) {
        action.metrics.map(metric => {
          updatedMetrics.push(metric.value);
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
