import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  userId: string;
  profilePicture: string;
  currentPlan: 'free' | 'premium';
}

const initialState: UserInfo = {
  firstName: 'Amel',
  lastName: 'FEDDAG',
  email: 'amel.feddag@ensia.edu.dz',
  phoneNumber: '+213 555 05 04 96',
  country: 'Algeria',
  userId: '',
  profilePicture: '',
  currentPlan: 'free',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserInfo>>) => {
      return { ...state, ...action.payload };
    },
    activatePremium: (state) => {
      state.currentPlan = 'premium';
    },
  },
});

export const { setUser, updateUser, activatePremium } = userSlice.actions;
export default userSlice.reducer;
