import {configureStore} from '@reduxjs/toolkit';
import {reducerApp} from './reducer.ts';
import {createAPI} from '../services/api.ts';

const api = createAPI();

export const store = configureStore({
  reducer: reducerApp,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
