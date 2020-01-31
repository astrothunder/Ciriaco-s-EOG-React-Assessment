import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Grid from '@material-ui/core/Grid';

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

export default function ChartContainer(props) {
  const dispatch = useDispatch();

  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);

  const metricHistory = useSelector(state => state.metrics.metricHistory);

  const metrics = useSelector(state => state.metrics.allMetrics);

  const getMeasurements = useCallback(
    getMultipleMeasurements =>
      dispatch({
        type: 'GET_MULTIPLE_MEASUREMENTS',
        data: getMultipleMeasurements,
      }),
    [dispatch],
  );

  const [res] = useQuery(
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

  useEffect(() => {
    const { data } = res;
    if (!data) return;
    getMeasurements(data.getMultipleMeasurements);
  }, [res, getMeasurements]);

  const classes = useStyles();

  if (metricHistory.length === 0) {
    return null;
  }

  console.log(selectedMetrics);

  let series = [];

  selectedMetrics.map(metric => {
    series.push({
      name: `${metric}`,
      data: metricHistory[metric],
    });
    return true;
  });

  selectedMetrics.map((metric, i) => {
    console.log(metric, i);
    console.log(metricHistory[metric][0].unit);
    return true;
  });

  return (
    <Grid container direction="row" justify="center" className={classes.container}>
      <Grid item>
        <LineChart width={1200} height={500} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" allowDataOverflow={true} allowDuplicatedCategory={false} />
          {selectedMetrics.map((metric, i) => {
            return (
              <YAxis yAxisId={i} dataKey="value" type="number" label={metricHistory[metric][0].unit} name={metric} />
            );
          })}
          <Tooltip />
          <Legend />
          {series.map(s => (
            <Line dataKey="value" type="monotone" data={s.data} key={s.name} dot={false} />
          ))}
        </LineChart>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: { paddingTop: '50px' },
});
