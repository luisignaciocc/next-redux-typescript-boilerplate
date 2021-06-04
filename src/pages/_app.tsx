import 'src/styles/globals.scss';
import React from 'react';
import { useStore } from 'react-redux';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import { MainTheme } from 'src/themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import wrapper from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultLayout } from 'src/layouts';

const App = function MyApp(props: AppProps): React.ReactElement {
  const { Component, pageProps } = props;

  const Layout: any = (Component as any)['Layout']
    ? (Component as any)['Layout']
    : DefaultLayout;

  const store = useStore();

  return (
    <React.Fragment>
      {/* // eslint-disable-next-line 
      @ts-ignore */}
      <PersistGate persistor={store.__persistor} loading={<h3>Loading...</h3>}>
        <Head>
          <title>React Boilerplate</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={MainTheme}>
          <SnackbarProvider maxSnack={3}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            }
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </React.Fragment>
  );
};

export default wrapper.withRedux(App);
