import React from 'react';
import { connect } from 'react-redux';
import { useAuth } from 'src/hooks';
import { RootState } from 'src/redux/store';
import { redirectToLogin } from 'src/utils/functions';

export interface WrappedProps {
  [key: string]: any;
  token: string;
}

const withProtectedComponent = (WrappedComponent: any) => {
  const hocComponent: any = (props: WrappedProps) => {
    const userAuth = useAuth(props.token);

    if (!userAuth || !userAuth.isAuthenticated) {
      redirectToLogin();
      return <h3>Loading...</h3>;
    }

    const authProps = { ...props, auth: userAuth };

    return <WrappedComponent {...authProps} />;
  };

  hocComponent.Layout = WrappedComponent.Layout
    ? WrappedComponent.Layout
    : null;

  hocComponent.getInitialProps = async (ctx: any): Promise<any> => {
    const { req } = ctx;
    let userAgent;
    if (process.browser) {
      userAgent = navigator.userAgent;
    } else {
      userAgent = req.headers['user-agent'];
    }
    const pageProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return {
      ...pageProps,
      userAgent,
    };
  };

  return connect(mapStateToProps)(hocComponent);
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
});

export default withProtectedComponent;
