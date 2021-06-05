import React from 'react';
import clsx from 'clsx';
import {
  Button,
  Hidden,
  makeStyles,
  Typography,
  Divider,
  Drawer,
} from '@material-ui/core';
import ExposureIcon from '@material-ui/icons/Exposure';
import InputIcon from '@material-ui/icons/Input';
import { Profile, SidebarNav } from './';
import palette from 'src/themes/main/palette';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    zIndex: 1000,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  logout: {
    textTransform: 'none',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  className?: string;
  onClose?: () => any;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary';
};

const Sidebar = (props: Props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Counter',
      href: '/counter',
      icon: <ExposureIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
          onItemClick={onClose}
        />
        <Hidden lgUp>
          <Divider className={classes.divider} />
          <Button
            variant="text"
            startIcon={<InputIcon color="error" fontSize="small" />}
            onClick={() => {
              return true;
            }}
          >
            <Typography color="error" className={classes.logout}>
              Cerrar Sesión
            </Typography>
          </Button>
        </Hidden>
      </div>
    </Drawer>
  );
};

export default Sidebar;
