import { createReducer } from '@reduxjs/toolkit';
import { loadReviews, setReviewsDataLoading } from '../action';
import {Review} from '../../domain/dto/review.ts';

interface ReviewsState {
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  isReviewsDataLoading: false,
};

const reviewProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewsDataLoading, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    });
});

export default reviewProcess;

