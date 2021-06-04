import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

export interface AuthState {
  isLoggedIn: boolean;
  user: any;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{ token: string; user: any }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn;

export const selectToken = (state: RootState): string | null =>
  state.auth.token;

export const authReducer = authSlice.reducer;
