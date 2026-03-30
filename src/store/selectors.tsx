import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './indexStore.ts';
import {OfferType} from '../domain/dto/offer.ts';

export const getSelectedCity = (state: RootState) => state.app.city;
export const getAllOffers = (state: RootState) => state.offers.offers;
export const getOffersLoadingStatus = (state: RootState) => state.offers.isOffersDataLoading;
export const getOffersError = (state: RootState) => state.offers.offersDataError;
export const getAuthorizationStatus = (state: RootState) => state.user.authStatus;
export const getUser = (state: RootState) => state.user.user;

export const getFilteredOffers = createSelector(
  [getAllOffers, getSelectedCity],
  (offers: OfferType[], city: string) => offers.filter((offer) => offer.city.name === city)
);

export const getFavoriteOffersCount = createSelector(
  [getAllOffers],
  (offers: OfferType[]) => offers.filter((offer) => offer.isFavorite).length
);
