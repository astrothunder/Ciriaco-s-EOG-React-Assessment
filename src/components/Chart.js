import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

export default function ChartContainer(props) {
  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);

  const metricHistory = useSelector(state => state.metrics.metricHistory);

  const classes = useStyles();

  const series = selectedMetrics.map(metric => {
    return {
      name: `${metric}`,
      type: 'line',
      data: metricHistory[metric],
    };
  });

  const options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: 'Metric Visualization',
      align: 'left',
      offsetX: 110,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            color: '#008FFB',
          },
        },
        title: {
          text: 'Income (thousand crores)',
          style: {
            color: '#008FFB',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      selectedMetrics.map(metric => {
        return {
          seriesName: `${metric}`,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              color: '#00E396',
            },
          },
          title: {
            text: `${metric}`,
            style: {
              color: '#00E396',
            },
          },
        };
      }),
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  return (
    <div className={classes.container}>
      {selectedMetrics.length !== 0 && <Chart options={options} series={series} type="line" height={350} />}
    </div>
  );
}

const useStyles = makeStyles({
  container: { width: '100%' },
});
