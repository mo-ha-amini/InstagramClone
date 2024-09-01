import { createSlice } from '@reduxjs/toolkit'
import { getfollowers, getfollowings, Follow,UnFollow } from './userAction'

const initialState = {
    Loading: false,

    Followers: null,
    getFollowersError: null,
    getFollowersSuccess: false,

    Followings: null,
    getFollowingsError: null,
    getFollowingsSuccess: false,

    FollowError: null,
    FollowSuccess: false,

    UnFollowError: null,
    UnFollowSuccess: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(getfollowers.pending, (state) => {
                state.Loading = true;
                state.getFollowersSuccess = false;
              })
              .addCase(getfollowers.fulfilled, (state, action) => {
                state.Loading = false;
                state.Followers = action.payload.data;
                state.getFollowersSuccess = action.payload.isSuccess;
                state.getFollowersError = action.payload.message;
              })
              .addCase(getfollowers.rejected, (state, action) => {
                state.Loading = false;
                state.getFollowersError = action.payload.message;
                state.getFollowersSuccess = false;
              })
              .addCase(getfollowings.pending, (state) => {
                state.Loading = true;
                state.getFollowingsSuccess = false;
              })
              .addCase(getfollowings.fulfilled, (state, action) => {
                state.Loading = false;
                state.Followings = action.payload.data;
                state.getFollowingsSuccess = action.payload.isSuccess;
                state.getFollowingsError = action.payload.message;
              })
              .addCase(getfollowings.rejected, (state, action) => {
                state.Loading = false;
                state.getFollowingsError = action.payload.message;
                state.getFollowingsSuccess = false;
              })
              .addCase(Follow.pending, (state) => {
                state.Loading = true;
                state.FollowSuccess = false;
              })
              .addCase(Follow.fulfilled, (state, action) => {
                state.Loading = false;
                state.FollowSuccess = action.payload.isSuccess;
                state.FollowError = action.payload.message;
              })
              .addCase(Follow.rejected, (state, action) => {
                state.Loading = false;
                state.FollowError = action.payload.message;
                state.FollowSuccess = false;
              })
              .addCase(UnFollow.pending, (state) => {
                state.Loading = true;
                state.UnFollowSuccess = false;
              })
              .addCase(UnFollow.fulfilled, (state, action) => {
                state.Loading = false;
                state.UnFollowSuccess = action.payload.isSuccess;
                state.UnFollowError = action.payload.message;
              })
              .addCase(UnFollow.rejected, (state, action) => {
                state.Loading = false;
                state.UnFollowError = action.payload.message;
                state.UnFollowSuccess = false;
              })
            }
})

export default userSlice.reducer
