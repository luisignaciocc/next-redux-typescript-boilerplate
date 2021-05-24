import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState } from '../slices/authSlice'

interface rejectMessage {
  errorMessage: string
}

export const logOutAction = createAsyncThunk(
  'user/logOut',
  async (_data, _thnukAPI) => {
    console.log('Logout')
  }
)

export const logInAction = createAsyncThunk<
  AuthState,
  any,
  { rejectValue: rejectMessage }
>('user/logIn', async (data) => {
  console.log(data, 'login action')

  return data
})
