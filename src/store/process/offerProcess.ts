import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, setOffersDataError, setOffersDataLoading, updateOffer, updateOfferFavorite} from '../action.ts';
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
    })
    .addCase(updateOfferFavorite, (state, action) => {
      const offer = state.offers.find((o) => o.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(updateOffer, (state, action) => {
      const index = state.offers.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      } else {
        state.offers.push(action.payload);
      }
    });
});

export default offerProcess;
