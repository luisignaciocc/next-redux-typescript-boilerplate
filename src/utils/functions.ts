import { ServerResponse } from 'http';
import { useAppDispatch } from 'src/hooks';
import Router from 'next/router';
import { logoutAction } from 'src/redux/slices/authSlice';

export const redirectToLogin = (req?: Request, server?: ServerResponse) => {
  const dispatch = useAppDispatch();
  if (req && server) {
    dispatch(logoutAction());
    server.writeHead(302, {
      Location: '/login',
    });
    server.end();
  } else {
    dispatch(logoutAction());
    Router.push('/login');
  }
};
