import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LandState {
    land_id: number;
    land_name: string;
    latitude: number;
    longitude: number;
    land_size: number;
    budget: number;
    ph_level: number;
    phosphorus: number;
    potassium: number;
    oxygen_level: number;
    nitrogen: number;
    selected?:boolean,
}

const initialState: LandState[] = [];

const landSlice = createSlice({
    name: 'lands',
    initialState,
    reducers: {
        addLand(state, action: PayloadAction<LandState>) {
            state.push(action.payload);
        },
        removeLand(state, action: PayloadAction<number>) {
            return state.filter(land => land.land_id !== action.payload);
        },
        updateLand(state, action: PayloadAction<LandState>) {
            const index = state.findIndex(land => land.land_id === action.payload.land_id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        resetLands() {
            return initialState;
        }
    }
});

export const {
    addLand,
    removeLand,
    updateLand,
    resetLands
} = landSlice.actions;

export default landSlice.reducer;
