import {AnyAction, configureStore} from '@reduxjs/toolkit';
import thunk, {ThunkAction} from 'redux-thunk';
import searchSlice from './reducers/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
