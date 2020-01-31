import React, { useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import getMostRecentValueSelector from '../store/selectors/getMostRecentValue';

const Metric = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  const { metric } = props;

  const handleSelectMetric = active => {
    if (active) {
      dispatch({ type: 'SELECT_METRICS', metric: metric });
    } else {
      dispatch({ type: 'UNSELECT_METRICS', metric: metric });
    }
  };

  const handleClicked = active => {
    setActive(!active);

    handleSelectMetric(!active);
  };

  const getMostRecentValue = useMemo(getMostRecentValueSelector);

  const value = useSelector(state => getMostRecentValue(state, metric));

  return (
    <Paper
      elevation={3}
      className={active ? classes.activeContainer : classes.container}
      onClick={() => handleClicked(active)}
    >
      <p className={classes.title}>{metric}</p>
      {active && <p className={classes.value}>{value}</p>}
    </Paper>
  );
};

// metricHistory[metric][metricHistory[metric].length - 1].y

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    margin: 10,
    padding: 20,
    cursor: 'pointer',
    backgroundColor: '#545454',
  },
  activeContainer: {
    textAlign: 'center',
    margin: 25,
    padding: 40,

    cursor: 'pointer',
    backgroundColor: '#AF3B6E',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: { fontSize: 38, fontWeight: 'bold' },
});

export default Metric;
