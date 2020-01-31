import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import MetricCard from '../components/MetricCard';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Metric from './Metric';
import { Fade } from '@material-ui/core';

const query = `
    query {
        getMetrics 
    }
    `;

const MetricSelector = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [res] = useQuery({
    query: query,
  });

  const { fetching, data, error } = res;

  let metrics;

  if (data) {
    metrics = data.getMetrics;
    dispatch({ type: 'GET_METRICS', metrics: metrics });
  }

  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);

  const handleSelectMetric = metric => {
    console.log(metric);

    // dispatch({ type: 'SELECT_METRICS', metric: metric });
  };

  

  return (
    <div className={classes.container}>
      <h2 style={{ textAlign: 'center', fontWeight: 400, fontFamily: 'Roboto' }}>Click on a metric to activate it.</h2>
      <Grid container direction="row" justify="center" alignItems="center">
        {fetching ? (
          <CircularProgress color="inherit" />
        ) : (
          <React.Fragment>
            {metrics.map(metric => {
              return (
                <Grid key={metric} item>
                  <Fade in={true}>
                    <Metric metric={metric} selectMetric={handleSelectMetric} />
                  </Fade>
                </Grid>
              );
            })}
          </React.Fragment>
        )}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    color: 'white',
  },
  metricsContainer: {
    flexDirection: 'row',
  },
});

export default MetricSelector;
