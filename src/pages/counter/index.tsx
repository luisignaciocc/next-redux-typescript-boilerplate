import type { NextPage } from 'next';
import React from 'react';
import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import withLayout from 'src/hocs/withLayout';
import withProtectedComponent from 'src/hocs/withProtectedComponent';

import Counter from 'src/components/pages/counter/Counter';
import { Link } from 'src/components/layout';

const useStyles = makeStyles((_theme) => ({
  root: {
    textAlign: 'center',
  },
  link: {
    color: 'rgb(112, 76, 182)',
  },
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
    animation: '$logo-float infinite 3s ease-in-out',
  },
  '@keyframes logo-float': {
    '0%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(10px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
}));

const IndexPage: NextPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column" spacing={6}>
      <Grid item>
        <img src="/images/logo-redux.svg" className={classes.logo} alt="logo" />
      </Grid>
      <Hidden smDown>
        <Grid item>
          <Counter />
        </Grid>
      </Hidden>
      <Grid item>
        <Typography variant="h1">
          Learn{' '}
          {
            <Link href="https://reactjs.org/" className={classes.link}>
              React
            </Link>
          }
          ,{' '}
          {
            <Link href="https://redux.js.org/" className={classes.link}>
              Redux
            </Link>
          }
          ,{' '}
          {
            <Link href="https://redux-toolkit.js.org/" className={classes.link}>
              Redux Toolkit
            </Link>
          }{' '}
          and{' '}
          {
            <Link href="https://react-redux.js.org/" className={classes.link}>
              React Redux
            </Link>
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withProtectedComponent(withLayout(IndexPage, 'main'));
