import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../types/User';
import {getUser, logOut} from '../actionCreators/usersActions';

interface UserState {
  user: UserType | undefined;
  userIsLoading: boolean;
}

const initialState: UserState = {
  user: undefined,
  userIsLoading: true,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state, action) => {
      state.userIsLoading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.userIsLoading = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userIsLoading = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default usersSlice.reducer;
