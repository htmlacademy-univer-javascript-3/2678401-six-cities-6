import {createReducer} from '@reduxjs/toolkit';
import {logout, requireAuthorization, setUser} from '../action.ts';
import {AuthStatus} from '../../const.ts';
import {User} from '../../domain/dto/user.ts';

interface UserState {
  authStatus: AuthStatus;
  user: User | null;
}

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authStatus = AuthStatus.NoAuth;
      state.user = null;
    });
});

export default userProcess;
