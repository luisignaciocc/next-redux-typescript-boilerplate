import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

type Props = {
  className?: string;
};

const Footer = (props: Props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/luisignaciocc"
          target="_blank"
        >
          Luis Ignacio Cabezas
        </Link>
        . {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption"></Typography>
    </div>
  );
};

export default Footer;
