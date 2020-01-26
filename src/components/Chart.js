import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useQuery } from 'urql';
import { Chart } from 'react-charts';

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

const query2 = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName ){
    metric
    value
    at
    unit
  }
}
`;

// Calculating 30 min chart history to populate chart.

const thirtyMinHistory = new Date() - 30 * 60 * 1000;

export default function ChartContainer(props) {
  const metricName = props.metricName;

  const classes = useStyles();

  const queryResult = useQuery(
    {
      query,
      variables: {
        input: {
          metricName,
          after: thirtyMinHistory,
        },
      },
    },
    metricName,
  );

  let dataChart = [
    {
      label: 'Series 1',
      data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }],
    },
  ];

  let newData = [];

  if (queryResult[0].data) {
    let data = queryResult[0].data.getMultipleMeasurements[0].measurements;

    newData = [];

    data.map(obj => {
      newData.push({ x: obj.at, y: obj.value });
    });

    dataChart = [
      {
        label: `${metricName}`,
        data: newData,
      },
    ];
  }

  const [res] = useQuery({
    query: query2,
    variables: { metricName: metricName },
    requestPolicy: 'network-only',
    pollInterval: 500,
  });

  const { fetching, data, error } = res;

  if (data) {
    if (data.getLastKnownMeasurement) {
      newData.push({ x: data.getLastKnownMeasurement.at, y: data.getLastKnownMeasurement.value });
    }

    dataChart = [
      {
        label: `${metricName}`,
        data: newData,
      },
    ];
  }

  const axes = [{ primary: true, type: 'time', position: 'bottom' }, { type: 'linear', position: 'left' }];

  return (
    <div className={classes.container}>
      {queryResult[0].data && <Chart data={dataChart} axes={axes} tooltip primaryCursor secondaryCursor />}
    </div>
  );
}

const useStyles = makeStyles({
  container: { height: 500, width: 700 },
});
