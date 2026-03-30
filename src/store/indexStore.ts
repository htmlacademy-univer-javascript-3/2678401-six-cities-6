import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer.ts';
import {createAPI, setupResponseInterceptor} from '../services/api.ts';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

setupResponseInterceptor(api, store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
