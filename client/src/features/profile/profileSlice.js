import { createSlice } from '@reduxjs/toolkit'
import { getProfile} from './profileActions'

const initialState = {
    Loading: false,
    profile: null,
    Error: null,
    Success: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(getProfile.pending, (state) => {
                state.Loading = true;
                state.Error = null;
                state.Success = false;
              })
              .addCase(getProfile.fulfilled, (state, action) => {
                state.Loading = false;
                state.profile = action.payload.data;
                state.Success = action.payload.isSuccess;
                state.Error = action.payload.message;
              })
              .addCase(getProfile.rejected, (state, action) => {
                state.Loading = false;
                state.Error = action.payload.message;
                state.Success = false;
              })
            }
})

export default profileSlice.reducer
