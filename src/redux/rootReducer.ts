import { combineReducers, AnyAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { authReducer, AuthState, counterReducer, CounterState } from './slices'

export interface State {
  auth: AuthState
  counter: CounterState
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE')
      return action.payload

    default: {
      const combineReducer = combineReducers({
        auth: authReducer,
        counter: counterReducer,
      })
      return combineReducer(state, action)
    }
  }
}

export default rootReducer
