import { configureStore } from '@reduxjs/toolkit';
//import landSlice from './LandSlice'; // Import the entire slice

// Extract the reducer from the slice
export const store = configureStore({
    reducer: {
        // land: landSlice, // Use landSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
