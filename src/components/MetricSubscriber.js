import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

const newMetricValues = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
  return null;
};
