import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import landsReducer from './landsSlice';
import postsReducer from './postsSlice';
import tokenReducer from './tokenSlice';
import { LOGOUT } from './actionTypes';

// Combine your reducers into a root reducer
const appReducer = combineReducers({
  user: userReducer,
  lands: landsReducer,
  posts: postsReducer,
  token: tokenReducer,
});

// Root reducer with logout handling
const rootReducer = (state: ReturnType<typeof appReducer>, action: any) => {
  if (action.type === LOGOUT) {
    // Reset state to initial values
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'lands', 'posts', 'token'], // List of reducers you want to persist
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);

// Export the store and RootState type
export type RootState = ReturnType<typeof store.getState>;
export default store;
