import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import sliceApp from './sliceApp';
import sliceAuth from './sliceAuth';
import sliceUser from './sliceUser';

const store = configureStore({
  reducer: {
    app: sliceApp,
    auth: sliceAuth,
    user: sliceUser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
