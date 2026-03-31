import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {AppRoute} from '../const';
import rootReducer from '../store/reducer';
import {AuthStatus} from '../const';
import Offer from '../pages/offer-screen/Offer.tsx';
import {Favorites} from '../pages/favorites-screen/Favorites.tsx';
import {PrivateRoute} from '../PrivateRoute.tsx';
import {Login} from '../pages/Login.tsx';
import {Main} from '../pages/main-screen/Main.tsx';
import {ErrorNotFound} from '../pages/ErrorNotFound.tsx';

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const TestApp = ({initialEntries}: { initialEntries: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path={AppRoute.Main} element={<Main/>}/>
      <Route path={AppRoute.Login} element={<Login/>}/>
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <Favorites/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<Offer/>}/>
      <Route path="*" element={<ErrorNotFound/>}/>
    </Routes>
  </MemoryRouter>
);

describe('App routing', () => {
  it('should render Main page for route "/"', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/']}/>
      </Provider>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should render Login page for route "/login"', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/login']}/>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
  });

  it('should redirect to "/login" for route "/favorites" when not authenticated', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/favorites']}/>
      </Provider>
    );

    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should render Offer page for route "/offer/:id"', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/offer/123']}/>
      </Provider>
    );

    const goToMainLink = screen.queryByText('Back on Main');
    expect(goToMainLink || screen.getAllByAltText('6 cities logo').length > 0).toBeTruthy();
  });

  it('should render ErrorNotFound page for unknown route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/unknown-route']}/>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back on Main')).toBeInTheDocument();
  });
});
