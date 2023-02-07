import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },

  },
})

export const { setIsAuth } = sliceAuth.actions;
export default sliceAuth.reducer;