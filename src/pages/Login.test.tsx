import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../store/reducer.ts';
import {AuthStatus} from '../const.ts';
import {Login} from './Login.tsx';

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const renderWithRouter = (component: JSX.Element, store = createMockStore()) => render(
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);

describe('Login page', () => {
  it('should render login form', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    renderWithRouter(<Login/>, store);

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
  });

  it('should render logo', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    renderWithRouter(<Login/>, store);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should allow typing in email and password fields', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    renderWithRouter(<Login/>, store);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
