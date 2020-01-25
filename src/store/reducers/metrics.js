import { GET_METRICS, SELECT_METRICS } from '../actions/actionTypes';

const initialState = {
  selectedMetrics: [],
  allMetrics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICS:
      return {
        ...state,
      };

    case SELECT_METRICS:
      let updatedMetrics = [];
      action.metrics.map(metric => {
        updatedMetrics.push(metric.value);
      });
      return {
        ...state,
        selectedMetrics: updatedMetrics,
      };

    default:
      return state;
  }
};

export default reducer;
