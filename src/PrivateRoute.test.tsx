import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {AppRoute, AuthStatus} from './const.ts';
import rootReducer from './store/reducer.ts';
import {PrivateRoute} from './PrivateRoute.tsx';

const createMockStore = (authStatus: AuthStatus) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      authStatus,
      user: authStatus === AuthStatus.Auth
        ? {
          email: 'test@example.com',
          token: 'token',
          name: 'Test User',
          avatarUrl: 'avatar.jpg',
          isPro: false,
        }
        : null,
    },
  },
});

describe('PrivateRoute component', () => {
  it('should render children when AuthorizationStatus is Auth', () => {
    const store = createMockStore(AuthStatus.Auth);
    const testContent = <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>{testContent}</PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to /login when AuthorizationStatus is NoAuth', () => {
    const store = createMockStore(AuthStatus.NoAuth);
    const testContent = <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <PrivateRoute>{testContent}</PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to /login when AuthorizationStatus is Unknown', () => {
    const store = createMockStore(AuthStatus.Unknown);
    const testContent = <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <PrivateRoute>{testContent}</PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
