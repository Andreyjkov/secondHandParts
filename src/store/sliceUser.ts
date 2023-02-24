import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../interface';


const initialState = {
  email: '',
  name: '',
  phone: '',
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserData>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
    removeUser(state) {
      state.email = '';
      state.name = '';
      state.phone = '';
    },
  },
});

export const { setUser, removeUser } = sliceUser.actions;

export default sliceUser.reducer;