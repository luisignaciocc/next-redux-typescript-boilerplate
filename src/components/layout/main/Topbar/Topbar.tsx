import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { Link } from 'src/components/layout';
import { useAppDispatch } from 'src/hooks';
import { logoutAction } from 'src/redux/slices';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  brand: {
    height: 50,
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
  onSidebarOpen: () => any;
};

const Topbar = (props: Props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <AppBar
      color="secondary"
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Hidden mdDown>
          <Link href="/">
            <img
              className={classes.brand}
              alt="Logo"
              src="/images/next-redux.png"
            />
          </Link>
        </Hidden>
        <div className={classes.flexGrow}></div>
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
