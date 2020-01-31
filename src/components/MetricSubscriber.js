import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

const newMetricValues = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
  const dispatch = useDispatch();
  const getNewMeasurement = useCallback(
    measurement =>
      dispatch({
        type: 'UPDATE_HISTORY',
        metric: measurement.metric,
        measurement,
      }),
    [dispatch],
  );
  const [subscriptionResponse] = useSubscription({ query: newMetricValues });
  const { data: subscriptionData } = subscriptionResponse;

  useEffect(() => {
    if (!subscriptionData) return;

    getNewMeasurement(subscriptionData.newMeasurement);
  }, [subscriptionData, getNewMeasurement]);

  return null;
};
