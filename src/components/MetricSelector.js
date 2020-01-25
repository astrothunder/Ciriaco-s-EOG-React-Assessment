import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { getMetrics, selectMetrics } from '../store/actions/index';
import { useQuery } from 'urql';
import MetricCard from '../components/MetricCard';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const query = `
    query {
        getMetrics 
    }
    `;

const MetricSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [res] = useQuery({
    query: query,
  });

  const { fetching, data, error } = res;

  let options;

  if (data) {
    options = data.getMetrics.map(item => {
      return { value: item, label: item };
    });
  }

  const allMetrics = useSelector(state => state.metrics.allMetrics);

  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);

  return (
    <div className={classes.container}>
      <Grid container justify="center" className={classes.topContainer}>
        <Grid item xs={8} className={classes.metricCardsContainer}>
          <Grid container direction="row">
            {selectedMetrics &&
              selectedMetrics.map(item => {
                return (
                  <Grid item>
                    <MetricCard item={item} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={4} className={classes.selectorContainer}>
          <h4 className={classes.selectorText}>Select a metric to visualize.</h4>
          {fetching ? (
            <CircularProgress color="secondary" />
          ) : (
            <div>
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={options}
                styles={colourStyles}
                onChange={metrics => dispatch({ type: 'SELECT_METRICS', metrics: metrics })}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: '#212121' }),
};

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
  selector: {},
  container: {},
  selectorContainer: {
    padding: 50,
  },
  selectorText: {
    color: 'white',
    letterSpacing: '2px',
    fontSize: '20px',
  },
  metricCardsContainer: {
    padding: 40,
  },
  topContainer: {
    flexGrow: 1,
  },
});

export default MetricSelector;

// const query = `
//     query {
//         getMetrics
//     }
//     `;

// class MetricSelector extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.onGetMetrics();
//   }

//   render() {
//     const { classes } = this.props;
//     // const { data } = this.props;
//     // const options = data.getMetrics.map(item => {
//     //   return { value: item, label: item };
//     // });
//     // const [res] = useQuery({
//     //   query: query,
//     // });

//     return (
//       <div className={classes.selectorContainer}>
//         <h4 className={classes.selectorText}>Select a metric to visualize.</h4>

//         <div className={classes.selector}>
//           <Select isMulti styles={colourStyles} onChange={metrics => console.log(metrics)} />
//         </div>
//       </div>
//     );
//   }
// }

// const colourStyles = {
//   control: styles => ({ ...styles, backgroundColor: '#212121' }),
// };

// const styles = theme => ({
//   card: {
//     margin: '5% 25%',
//   },
//   selector: {},
//   selectorContainer: {
//     position: 'absolute',
//     right: '10%',
//   },
//   selectorText: {
//     color: 'white',
//     letterSpacing: '2px',
//     fontSize: '20px',
//   },
// });

// const mapStateToProps = state => {
//   return {
//     metrics: state.metrics.allMetrics,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onGetMetrics: () => dispatch(getMetrics()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withStyles(styles)(MetricSelector));
