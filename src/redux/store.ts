import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist'
const storage = require('redux-persist/lib/storage').default
import { combineReducers } from 'redux'
import { counterReducer, authReducer } from './slices'

const devMode = process.env.NODE_ENV === 'development'
const isServer = typeof window === 'undefined'

let reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
})

if (!isServer) {
  const persistConfig = {
    key: 'nextjs',
    whitelist: ['auth', 'counter'],
    storage,
  }

  reducers = persistReducer(persistConfig, reducers)
}

const store = configureStore({
  reducer: reducers,
  devTools: devMode,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  ],
})

if (!isServer) {
  store.__persistor = persistStore(store)
}

const setupStore = (_context: any): EnhancedStore => store

const makeStore: MakeStore = (context) => setupStore(context)

export const wrapper = createWrapper(makeStore, {
  debug: devMode,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default wrapper
