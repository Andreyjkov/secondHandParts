import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  // token: null,
  // id: null,
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload;
      // state.token = action.payload.token;
      // state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      // state.token = null;
      // state.id = null;
    },
  },
});

export const { setUser, removeUser } = sliceUser.actions;

export default sliceUser.reducer;