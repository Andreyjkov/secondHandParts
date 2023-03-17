import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../interface';


const initialState = {
  email: '',
  name: '',
  phone: '',
  photoURL: ''
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
    setPhotoURL(state, action: PayloadAction<string>) {
      state.photoURL = action.payload;
    },
    removeUser(state) {
      state.email = '';
      state.name = '';
      state.phone = '';
      state.photoURL = ''
    },
  },
});

export const { setUser, removeUser, setPhotoURL } = sliceUser.actions;

export default sliceUser.reducer;