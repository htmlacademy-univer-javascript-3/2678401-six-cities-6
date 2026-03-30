import {createAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferType} from '../offer.ts';
import {AppDispatch, RootState} from './indexStore.ts';

export const changeCity = createAction<string>('app/changeCity');
export const loadOffers = createAction<OfferType[]>('app/loadOffers');
export const setOffersDataLoading = createAction<boolean>('app/setOffersDataLoading');
export const setOffersDataError = createAction<string | null>('app/setOffersDataError');

export const fetchOffersAction = () =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    dispatch(setOffersDataLoading(true));
    dispatch(setOffersDataError(null));
    try {
      const { data } = await api.get<OfferType[]>('/offers');
      dispatch(loadOffers(data));
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to load data. The server is unavailable.';
      dispatch(setOffersDataError(errorMessage));
    } finally {
      dispatch(setOffersDataLoading(false));
    }
  };
