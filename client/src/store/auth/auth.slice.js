import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.value += 1;
    },
    logout: (state, action) => {
      state.value -= 1;
      console.log(action.payload);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
