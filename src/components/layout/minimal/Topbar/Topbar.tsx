import React from 'react';
import clsx from 'clsx';
import { IconButton, makeStyles } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { Link } from 'src/components/layout';
import { useAppDispatch } from 'src/hooks';
import { logoutAction } from 'src/redux/slices';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  brand: {
    height: 30,
  },
  flexGrow: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

type Props = {
  className?: string;
};

const Topbar = (props: Props): React.ReactElement => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="inherit"
      position="static"
    >
      <Toolbar>
        <Link href="/">
          <img
            className={classes.brand}
            alt="Logo"
            src="/images/nextjs-3.svg"
          />
        </Link>
        <div className={classes.flexGrow}></div>
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={handleSignOut}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
