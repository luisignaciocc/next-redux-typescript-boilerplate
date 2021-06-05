import jwtDecode from 'jwt-decode';
import { selectToken, selectUser } from 'src/redux/slices';
import { useAppSelector } from './useRedux';

type DecodedToken = {
  sub: string;
  iat: number;
  exp: number;
  jti: string;
  iss: string;
};

export type AuthToken = {
  expiresAt: number;
  isExpired: boolean;
  isAuthenticated: boolean;
  authorizationString: string;
  token: string;
} | null;

export const useAuth = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    // console.log('timestamp', new Date());
    // console.log('expTime', new Date(decodedToken.exp * 1000));
    const expiresAt = decodedToken.exp ? decodedToken.exp : Infinity;
    const isExpired = new Date() > new Date(expiresAt);
    const isAuthenticated = !isExpired;
    const authorizationString = `Bearer ${token}`;
    return {
      expiresAt,
      isExpired,
      isAuthenticated,
      authorizationString,
      token,
    };
  } else {
    return null;
  }
};

export const useToken = () => useAppSelector(selectToken);

export const useAuthUser = () => useAppSelector(selectUser);
