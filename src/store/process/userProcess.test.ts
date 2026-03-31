import {describe, it, expect} from 'vitest';
import userProcess from './userProcess';
import {requireAuthorization, setUser, logout} from '../action';
import {AuthStatus} from '../../const';
import {User} from '../../domain/dto/user.ts';

const mockUser: User = {
  email: 'test@example.com',
  token: 'test-token',
  name: 'Test User',
  avatarUrl: 'avatar.jpg',
  isPro: false,
};

describe('user-process reducer', () => {
  it('should return initial state', () => {
    const state = userProcess(undefined, {type: 'unknown'});
    expect(state).toEqual({
      authStatus: AuthStatus.Unknown,
      user: null,
    });
  });

  describe('requireAuthorization', () => {
    it('should set authorization status to Auth', () => {
      const initialState = {
        authStatus: AuthStatus.Unknown,
        user: null,
      };
      const action = requireAuthorization(AuthStatus.Auth);
      const state = userProcess(initialState, action);

      expect(state.authStatus).toBe(AuthStatus.Auth);
    });

    it('should set authorization status to NoAuth', () => {
      const initialState = {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      };
      const action = requireAuthorization(AuthStatus.NoAuth);
      const state = userProcess(initialState, action);

      expect(state.authStatus).toBe(AuthStatus.NoAuth);
    });

    it('should set authorization status to Unknown', () => {
      const initialState = {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      };
      const action = requireAuthorization(AuthStatus.Unknown);
      const state = userProcess(initialState, action);

      expect(state.authStatus).toBe(AuthStatus.Unknown);
    });
  });

  describe('setUser', () => {
    it('should set user data', () => {
      const initialState = {
        authStatus: AuthStatus.Unknown,
        user: null,
      };
      const action = setUser(mockUser);
      const state = userProcess(initialState, action);

      expect(state.user).toEqual(mockUser);
    });

    it('should set user to null (logout)', () => {
      const initialState = {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      };
      const action = setUser(null);
      const state = userProcess(initialState, action);

      expect(state.user).toBeNull();
    });
  });

  describe('logout', () => {
    it('should reset authorizationStatus to NoAuth and user to null', () => {
      const initialState = {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      };
      const action = logout();
      const state = userProcess(initialState, action);

      expect(state.authStatus).toBe(AuthStatus.NoAuth);
      expect(state.user).toBeNull();
    });
  });
});
