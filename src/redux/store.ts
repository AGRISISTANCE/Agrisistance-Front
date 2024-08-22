import { configureStore } from '@reduxjs/toolkit';
// import your reducers here when you create them
import exampleReducer from './exampleSlice';


export const store = configureStore({
  reducer: {
    // Add your reducers here
    example: exampleReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
