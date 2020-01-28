import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';

const query = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName ){
    metric
    value
    at
    unit
  }
}
`;

export default function MetricCard(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [res] = useQuery({
    query: query,
    variables: { metricName: props.item },
    requestPolicy: 'network-only',
    pollInterval: 500,
  });

  const { data } = res;

  let value;

  if (data) {
    value = data.getLastKnownMeasurement.value;

    dispatch({ type: 'UPDATE_HISTORY', metric: props.item, value: value });
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography className={classes.title} color="textSecondary">
              {props.item}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.valueContainer}>
            <Typography className={classes.value} color="textSecondary">
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: 20,
    backgroundColor: '#413F54',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 46,
    color: 'white',
    fontWeight: 'bold',
  },
  valueContainer: {
    position: 'relative',
    right: 0,
  },
});
