import _ from 'lodash';
import {
  initiateSearch,
  searchFailed,
  setLoading,
  setSelectedImage,
  storeResult,
} from '../reducers/searchSlice';
import {AppThunk} from '../store';

const PER_PAGE = 20;

const API_KEY = '29558513-bba8268c27db9668d612ec1ad';
const PIXBAY_BASE = `https://pixabay.com/api/?key=${API_KEY}`;

async function invokeSearch(query = '', page = 1, per_page = PER_PAGE) {
  const requestURI = `${PIXBAY_BASE}&q=${encodeURIComponent(
    query,
  )}&image_type=all&pretty=true&per_page=${per_page}&page=${page}`;
  console.log('PIXBAY', query, page, per_page);
  const response = await fetch(requestURI);
  const result = await response.json();
  console.log('PIXBAY - RESPONSE', query, page, per_page, result.hits.length);
  return result;
}

async function invokeFetchById(id: number) {
  const requestURI = `${PIXBAY_BASE}&id=${id}`;
  console.log('PIXBAY', id);
  const response = await fetch(requestURI);
  const result = await response.json();
  console.log('PIXBAY - RESPONSE', id, result.hits.length);
  return result;
}

export function searchImages(query = '', page = 1): AppThunk {
  return async function searchImagesThunk(dispatch, getState) {
    dispatch(initiateSearch(query));
    try {
      const result = await invokeSearch(query, page);
      //await new Promise(resolve => setTimeout(resolve, 10000));
      dispatch(storeResult({data: result.hits, page}));
    } catch (networkError) {
      dispatch(searchFailed({page}));
    }
  };
}

export function continueSearch(): AppThunk {
  return async function searchImagesThunk(dispatch, getState) {
    if (getState().search.loading) {
      return;
    }
    const {searchString, page} = getState().search;
    const newPage = page + 1;
    try {
      dispatch(setLoading(true));
      const result = await invokeSearch(searchString, newPage, PER_PAGE);
      dispatch(storeResult({data: result.hits, page: newPage}));
    } catch (networkError) {
      dispatch(searchFailed({page: newPage}));
      
    }
  };
}

export function getImageById(id: number): AppThunk {
  return async function searchImagesThunk(dispatch, getState) {
    let found = _.find(getState().search.results, {id});
    if (!found) {
      const response = await invokeFetchById(id);
      if (response.hits > 0) {
        found = response.hits[0];
      }
    }
    if (!found) {
      // TODO: handle case
      return;
    }
    dispatch(setSelectedImage(found));
  };
}
