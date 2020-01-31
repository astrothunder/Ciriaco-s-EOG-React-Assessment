import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  console.log(metricHistory);

  if (metricHistory.length === 0) {
    return null;
  }

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className={classes.container}>
      <LineChart width={1000} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

const useStyles = makeStyles({
  container: { width: '100%', padding: '15px' },
});
