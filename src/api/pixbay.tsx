import {initiateSearch, storeResult} from '../searchSlice';
import {AppThunk, RootState} from '../store';

const API_KEY = '29558513-bba8268c27db9668d612ec1ad';
export function searchImages(query = '', page = 1, per_page = 20): AppThunk {
  return async function searchImagesThunk(dispatch, getState) {
    if (getState().search.loading) {
      return;
    }
    dispatch(initiateSearch(query));
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        query,
      )}&image_type=all&pretty=true&per_page=${per_page}&page=${page}`,
    );
    const result = await response.json();
    dispatch(storeResult({data: result.hits}));
    console.log(result);
  };
}

export const searchStateSelector = (state: RootState) => state.search;
