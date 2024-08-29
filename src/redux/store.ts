import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import landsReducer from './landsSlice';
import postsReducer from './postsSlice';
//import tokenSlice from './tokenSlice';
import tokenReducer from './tokenSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    lands: landsReducer,
    posts: postsReducer,
    token: tokenReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
