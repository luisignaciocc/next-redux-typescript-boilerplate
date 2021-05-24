import { createSlice /* PayloadAction */ } from '@reduxjs/toolkit'

import { logInAction, logOutAction } from 'src/redux/actions/authActions'
import type { RootState } from 'src/redux/store'

export interface AuthState {
  isLoggedIn: boolean
  user: any
  signUpdata?: any
  loginData?: any
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload,
      state.isLoged = true
    }, */
  },
  extraReducers: (builder) =>
    builder
      // builder의 addCase는 typescript의 타입 추론 사용할 때 편하다.
      .addCase(logInAction.pending, (_state, _action) => {})
      .addCase(logInAction.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
      })
      .addCase(logInAction.rejected, (_state, _action) => {})

      .addCase(logOutAction.pending, (_state, _action) => {})
      .addCase(logOutAction.fulfilled, (_state, _action) => {})
      .addCase(logOutAction.rejected, (_state, _action) => {})
      .addDefaultCase(() => {}),
})

// export const { setToken } = authSlice.actions

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn

export const authReducer = authSlice.reducer
