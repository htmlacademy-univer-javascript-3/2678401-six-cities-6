import {createReducer} from '@reduxjs/toolkit';
import {OfferType} from '../mocks/OfferType.ts';
import {changeCity, loadOffers} from './action.ts';

interface State {
  city: string;
  offers: OfferType[];
}

const initialState: State = {
  city: 'Paris',
  offers: [],
};

export const reducerApp = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
