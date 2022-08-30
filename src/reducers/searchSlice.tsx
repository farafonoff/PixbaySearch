import {StackRouter} from '@react-navigation/routers';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PixbaySearchResult} from '../api/types';

export interface SearchState {
  noDataError: boolean;
  error: boolean;
  hasMoreData: boolean;
  results: PixbaySearchResult[];
  selectedImage: PixbaySearchResult | null;
  searchString: string;
  loading: boolean;
  page: number;
}

const initialState: SearchState = {
  noDataError: false,
  error: false,
  hasMoreData: false,
  results: [],
  selectedImage: null,
  searchString: '',
  loading: false,
  page: 0,
};

export interface ResultsPayload {
  data: PixbaySearchResult[];
  page: number;
}

export interface RequestFailedPayload {
  page: number;
}

export const searchSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetSearch: state => {
      return initialState;
    },
    initiateSearch: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      state.loading = true;
      state.error = false;
      state.page = 0;
      state.noDataError = false;
      state.results = [];
    },
    storeResult: (state, action: PayloadAction<ResultsPayload>) => {
      if (action.payload.page <= state.page) {
        return state;
      }
      state.loading = false;
      state.results = [...state.results, ...action.payload.data];
      state.page = action.payload.page;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    searchFailed: (state, action: PayloadAction<RequestFailedPayload>) => {
      state.loading = false;
      if (action.payload.page === 1) {
        state.noDataError = true;
      } else {
        state.error = true;
      }
    },
    setSelectedImage: (state, action: PayloadAction<PixbaySearchResult>) => {
      state.selectedImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initiateSearch,
  storeResult,
  setLoading,
  setSelectedImage,
  searchFailed,
} = searchSlice.actions;

export default searchSlice.reducer;
