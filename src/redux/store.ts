import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
const storage = require('redux-persist/lib/storage').default;
import { combineReducers } from 'redux';
import { counterReducer, authReducer } from './slices';

const devMode = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

let reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

if (!isServer) {
  const persistConfig = {
    key: 'nextjs',
    whitelist: ['auth'],
    storage,
  };

  // eslint-disable-next-line
  // @ts-ignore
  reducers = persistReducer(persistConfig, reducers);
}

const store = configureStore({
  reducer: reducers,
  devTools: devMode,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  ],
});

if (!isServer) {
  // eslint-disable-next-line
  // @ts-ignore
  store.__persistor = persistStore(store);
}

export const makeStore = (): EnhancedStore => store;

export const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default wrapper;
