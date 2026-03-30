import {combineReducers} from '@reduxjs/toolkit';
import appProcess from './process/appProcess.ts';
import offerProcess from './process/offerProcess.ts';
import userProcess from './process/userProcess.ts';
import reviewProcess from './process/reviewProcess.ts';

const rootReducer = combineReducers({
  app: appProcess,
  offers: offerProcess,
  user: userProcess,
  reviews: reviewProcess,
});

export default rootReducer;
