import {createAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferType} from '../domain/dto/offer.ts';
import {AppDispatch, RootState} from './indexStore.ts';
import {User} from '../domain/dto/user.ts';
import {AuthStatus} from '../const.ts';
import {TOKEN_KEY} from '../services/api';

export const changeCity = createAction<string>('app/changeCity');
export const loadOffers = createAction<OfferType[]>('app/loadOffers');
export const setOffersDataLoading = createAction<boolean>('app/setOffersDataLoading');
export const setOffersDataError = createAction<string | null>('app/setOffersDataError');
export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
export const setUser = createAction<User | null>('user/setUser');

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

export const checkAuthAction = () =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    try {
      const {data} = await api.get<User>('/login');
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      dispatch(setUser(null));
    }
  };

export const loginAction = (email: string, password: string) =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    try {
      const {data} = await api.post<User>('/login', {email, password});
      localStorage.setItem(TOKEN_KEY, data.token);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      throw error;
    }
  };

export const logout = createAction('user/logout');

export const logoutAction = () => (dispatch: AppDispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  dispatch(logout());
};
