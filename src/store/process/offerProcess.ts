import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, setOffersDataError, setOffersDataLoading} from '../action.ts';
import {OfferType} from '../../domain/dto/offer.ts';

interface OffersState {
  offers: OfferType[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
}

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
};

const offerProcess = createReducer(initialState, (builder) => {
  builder
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

export default offerProcess;
