import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import landsReducer from './landsSlice';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    lands: landsReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
