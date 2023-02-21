import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBaseData } from '../services/dataBase/getAllDataFirebase';

const initialState = {
  base: [] as IBaseData[]
};

const sliceBase = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBase(state, action: PayloadAction<IBaseData[]>) {
      state.base = action.payload
    },
    updataDocStore(state, action: PayloadAction<IBaseData>) {
      state.base?.forEach((item, i) => {
        if (item.docId === action.payload.docId) {
          state.base[i] = action.payload
        }
      })
    },
    deleteDocStore(state, action: PayloadAction<string>) {
      const id = action.payload
      state.base = state.base.filter((item) => {
        return item.docId !== id
      })
    },
  },
});

export const { setBase, updataDocStore, deleteDocStore } = sliceBase.actions;

export default sliceBase.reducer;