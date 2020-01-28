import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const query = `
    query($input: [MeasurementQuery]) {
      getMultipleMeasurements(input: $input) {
        metric
        measurements {
          at
          value
          metric
          unit
        }
      }
    }
    `;

// Calculating 30 min chart history to populate chart.

const thirtyMinHistory = new Date() - 30 * 60 * 1000;

export default () => {
  const dispatch = useDispatch();

  const metrics = useSelector(state => state.metrics.allMetrics);

  const classes = useStyles();

  const name = "Ciriaco's";

  const [queryResult] = useQuery(
    {
      query,
      variables: {
        input: metrics.map(metricName => ({
          metricName,
          after: thirtyMinHistory,
        })),
      },
    },
    [metrics],
  );

  if (queryResult.data) {
    dispatch({ type: 'GET_MULTIPLE_MEASUREMENTS', data: queryResult.data });
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
