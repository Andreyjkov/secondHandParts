import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sliceApp = createSlice({
  name: 'app',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = sliceApp.actions;
export default sliceApp.reducer;