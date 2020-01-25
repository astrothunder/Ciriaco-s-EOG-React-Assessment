import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useQuery } from 'urql';

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

export default function MetricCard(props) {
  const classes = useStyles();

  const [res] = useQuery({
    query: query,
  });

  const { fetching, data, error } = res;

  console.log(data);

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
              168.78
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
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 66,
    color: 'white',
    fontWeight: 'bold',
  },
  valueContainer: {
    position: 'relative',
    right: 0,
  },
});
