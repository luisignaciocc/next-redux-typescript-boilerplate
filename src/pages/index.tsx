import type { NextPage } from 'next';
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import withLayout from 'src/hocs/withLayout';
import withProtectedComponent from 'src/hocs/withProtectedComponent';

const useStyles = makeStyles((_theme) => ({
  root: {
    textAlign: 'center',
    height: 'calc(100vh - 165px)',
  },
  img: {
    maxWidth: '100%',
  },
}));

const IndexPage: NextPage = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      spacing={6}
      justify="center"
    >
      <Grid item>
        <img
          src="/images/undraw_welcome_cats_thqn.svg"
          className={classes.img}
          alt="welcome"
        />
      </Grid>
    </Grid>
  );
};

export default withProtectedComponent(withLayout(IndexPage, 'main'));
