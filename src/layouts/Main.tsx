import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, TopBar, Footer } from 'src/components/layout/main';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
  wrapper: {
    padding: theme.spacing(4),
    minHeight: 'calc(100vh - 150px)',
  },
}));

const Main = (props: any) => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <TopBar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        <div className={classes.wrapper}>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default Main;
