import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const Metric = props => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  return (
    <Paper
      elevation={3}
      className={active ? classes.activeContainer : classes.container}
      onClick={() => setActive(!active)}
    >
      <p className={classes.title}>{props.metric}</p>
      <p className={classes.value}>{props.value}</p>
    </Paper>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    margin: 25,
    padding: 0,
    height: 100,
    width: 150,
    cursor: 'pointer',
    backgroundColor: '#545454',
  },
  activeContainer: {
    textAlign: 'center',
    margin: 25,
    padding: 0,
    height: 150,
    width: 200,
    cursor: 'pointer',
    backgroundColor: '#AF3B6E',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  value: {},
});

export default Metric;
