import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isVerification: false
  },
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setIsVerification(state, action: PayloadAction<boolean>) {
      state.isVerification = action.payload
    },
  },
})

export const { setIsAuth, setIsVerification } = sliceAuth.actions;
export default sliceAuth.reducer;