import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import MetricSelector from '../../components/MetricSelector';
import * as actions from '../../store/actions/actionTypes';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
    getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Metric />
    </Provider>
  );
};

const Metric = () => {
  const [result] = useQuery({
    query,
  });

  const { dispatch } = useDispatch();

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.METRIC_API_ERROR_RECEIVED({ error: error.message }));
      return;
    }
    if (!data) return;
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <MetricSelector data={data} />;
};
