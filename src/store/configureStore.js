import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import metricReducer from './reducers/metrics';

const rootReducer = combineReducers({
  metrics: metricReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
