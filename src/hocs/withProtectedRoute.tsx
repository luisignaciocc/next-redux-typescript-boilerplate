import React from 'react'
import ServerCookie from 'next-cookies'
import { AuthToken, AUTH_COOKIE, redirectToLogin } from '../services'

interface AuthCheckResponse {
  auth: AuthToken
}

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = async (
  token: string,
  _req?: any,
  _res?: any
): Promise<AuthCheckResponse> => {
  // console.log('Checking auth token');

  const auth = new AuthToken(token)

  return {
    auth,
  }
}

export interface AuthProps {
  [key: string]: any
  auth: AuthToken
}

const withProtectedComponent = (WrappedComponent: any) => {
  let hocComponent: any = ({ ...props }: AuthProps) => {
    // the server pass to the client serializes the token
    // so we have to reinitialize the authToken class
    //
    // @see https://github.com/zeit/next.js/issues/3536

    props.auth = new AuthToken(props.auth.token)

    return <WrappedComponent {...props} />
  }

  hocComponent.Layout = WrappedComponent.Layout ? WrappedComponent.Layout : null

  hocComponent.getInitialProps = async (ctx: any): Promise<AuthProps> => {
    const { req, res } = ctx
    const token = ServerCookie(ctx)[AUTH_COOKIE]

    const userAuth = await checkUserAuthentication(token ?? '', req, res)

    // Are you an authorized user or not?
    if (!userAuth.auth.isAuthenticated) {
      // Handle server-side and client-side rendering.
      redirectToLogin(req, res)
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...ctx,
        ...userAuth,
      })

      // console.log(wrappedProps)

      return { ...wrappedProps, ...userAuth }
    } else {
      return {
        auth: userAuth.auth,
      }
    }

    return { auth: userAuth.auth }
  }

  return hocComponent
}

export default withProtectedComponent
