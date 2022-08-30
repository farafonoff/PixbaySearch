import {createSelector} from 'reselect';
import {RootState} from '../store';

export const searchStateSelector = (state: RootState) => state.search;

export const getCurrentImage = createSelector(
  [searchStateSelector],
  search => search.selectedImage,
);
