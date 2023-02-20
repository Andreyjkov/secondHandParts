import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBaseData } from '../services/dataBase/getAllDataFirebase';

const initialState = {
  base: null as IBaseData[] | null
};

const sliceBase = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBase(state, action: PayloadAction<IBaseData[]>) {
      state.base = action.payload
    },
  },
});

export const { setBase } = sliceBase.actions;

export default sliceBase.reducer;