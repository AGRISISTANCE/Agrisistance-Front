import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
}

// Flag to toggle between dummy and real token
const USE_DUMMY_TOKEN = true;

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzk0ZmU1MDItNzlhMC00YTZkLWE1MzMtOWI3MmEyODQ1OWFiIiwiaWF0IjoxNzI1MDU3NTg4LCJleHAiOjE3MjU5MjE1ODh9.MZF5lbrYVFHN_RkeEtDLjG0Umq7zwEJctFfkQWDbvPk';

const initialState: TokenState = {
  token: USE_DUMMY_TOKEN ? dummyToken : null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    toggleToken: (state) => {
      state.token = state.token ? null : dummyToken;
    },
  },
});

export const { setToken, clearToken, toggleToken } = tokenSlice.actions;
export default tokenSlice.reducer;
