import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {AuthStatus} from '../../const';
import rootReducer from '../../store/reducer';
import {OfferType} from '../../domain/dto/offer.ts';
import {Main} from './Main.tsx';

const mockOffer: OfferType = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.856613,
    longitude: 2.352222,
    zoom: 10,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test-image.jpg',
};

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    app: {
      city: 'Paris',
    },
    offers: {
      offers: [mockOffer],
      isOffersDataLoading: false,
      offersDataError: null,
    },
    user: {
      authStatus: AuthStatus.NoAuth,
      user: null,
    },
    ...initialState,
  },
});

const renderWithRouter = (component: JSX.Element, store = createMockStore()) => render(
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);

describe('Main page', () => {
  it('should render main page with logo', () => {
    renderWithRouter(<Main/>);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render cities list', () => {
    renderWithRouter(<Main/>);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should render sign in link when user is not authenticated', () => {
    renderWithRouter(<Main/>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info when authenticated', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.Auth,
        user: {
          email: 'test@example.com',
          token: 'token',
          name: 'Test User',
          avatarUrl: 'avatar.jpg',
          isPro: false,
        },
      },
    });
    renderWithRouter(<Main/>, store);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
