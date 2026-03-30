import {createReducer} from '@reduxjs/toolkit';
import {OfferType} from '../offer.ts';
import {changeCity, loadOffers, setOffersDataError, setOffersDataLoading} from './action.ts';

interface State {
  city: string;
  offers: OfferType[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
}

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
};

export const reducerApp = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffersDataError, (state, action) => {
      state.offersDataError = action.payload;
    });
});
