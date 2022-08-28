import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PixbaySearchResult {
  id: number;
  user_id: number;
  tags: string;
  imageHeight: number;
  imageWidth: number;
  previewURL: string;
  largeImageURL: string;
}

export interface SearchState {
  noDataError: boolean;
  error: boolean;
  hasMoreData: boolean;
  results: PixbaySearchResult[];
  searchString: string;
  loading: boolean;
}

const initialState: SearchState = {
  noDataError: false,
  error: false,
  hasMoreData: false,
  results: [],
  searchString: '',
  loading: false,
};

export interface ResultsPayload {
  data: PixbaySearchResult[];
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
      state.noDataError = false;
    },
    storeResult: (state, action: PayloadAction<ResultsPayload>) => {
      state.loading = false;
      state.results = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {initiateSearch, storeResult} = searchSlice.actions;

export default searchSlice.reducer;
