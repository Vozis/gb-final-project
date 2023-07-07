import { ISearch } from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialFilterState {
  filterParamsArray: ISearch;
}

const initialState: IInitialFilterState = {
  filterParamsArray: {
    searchParams: [{ paramsSearch: 'name', valuesSearch: '' }],
    filterNestedFieldsParams: [],
    filterEventFieldsParams: [],
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterParamsArray: (state, action: PayloadAction<ISearch>) => {
      state.filterParamsArray = action.payload;
    },
    resetFilterParamsArray: state => {
      return initialState;
    },
    resetFilterState: state => {
      return initialState;
    },
  },
});

export const { reducer, actions } = filterSlice;
