import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from '../action.ts';

interface AppState {
  city: string;
}

const initialState: AppState = {
  city: 'Paris',
};

const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export default appProcess;
