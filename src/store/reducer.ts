import {combineReducers} from '@reduxjs/toolkit';
import appProcess from './process/appProcess.ts';
import offerProcess from './process/offerProcess.ts';
import userProcess from './process/userProcess.ts';

const rootReducer = combineReducers({
  app: appProcess,
  offers: offerProcess,
  user: userProcess,
});

export default rootReducer;
