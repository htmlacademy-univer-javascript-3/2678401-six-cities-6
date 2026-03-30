import {configureStore} from '@reduxjs/toolkit';
import {reducerApp} from './reducer.ts';

export const store = configureStore({
  reducer: reducerApp,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
