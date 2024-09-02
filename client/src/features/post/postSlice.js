import { createSlice } from '@reduxjs/toolkit'
import { getUserPosts, createPosts, getFeedPosts, likePost } from './postAction'

const initialState = {
    Loading: false,
    Posts: null,
    getPostError: null,
    getPostSuccess: false,

    createPostError: null,
    createPostSuccess: false,

    FeedPosts: null,
    getFeedPostError: null,
    getFeedPostSuccess: false,

    likePostError: null,
    likePostSuccess: false,
    
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(getUserPosts.pending, (state) => {
                state.Loading = true;
                state.getPostSuccess = false;
              })
              .addCase(getUserPosts.fulfilled, (state, action) => {
                state.Loading = false;
                state.Posts = action.payload.data;
                state.getPostSuccess = action.payload.isSuccess;
                state.getPostError = action.payload.message;
              })
              .addCase(getUserPosts.rejected, (state, action) => {
                state.Loading = false;
                state.getPostError = action.payload.message;
                state.getPostSuccess = false;
              })

              .addCase(createPosts.pending, (state) => {
                state.Loading = true;
                state.createPostSuccess = false;
              })
              .addCase(createPosts.fulfilled, (state, action) => {
                state.Loading = false;
                state.createPostSuccess = action.payload.isSuccess;
                state.createPostError = action.payload.message;
              })
              .addCase(createPosts.rejected, (state, action) => {
                state.Loading = false;
                state.createPostError = action.payload.message;
                state.createPostSuccess = false;
              })

              .addCase(getFeedPosts.pending, (state) => {
                state.Loading = true;
                state.getFeedPostSuccess = false;
              })
              .addCase(getFeedPosts.fulfilled, (state, action) => {
                state.Loading = false;
                state.FeedPosts = action.payload.data;
                state.getFeedPostSuccess = action.payload.isSuccess;
                state.getFeedPostError = action.payload.message;
              })
              .addCase(getFeedPosts.rejected, (state, action) => {
                state.Loading = false;
                state.getFeedPostError = action.payload.message;
                state.getFeedPostSuccess = false;
              })

              
              .addCase(likePost.pending, (state) => {
                state.Loading = true;
                state.createPostSuccess = false;
              })
              .addCase(likePost.fulfilled, (state, action) => {
                state.Loading = false;
                state.createPostSuccess = action.payload.isSuccess;
                state.createPostError = action.payload.message;
              })
              .addCase(likePost.rejected, (state, action) => {
                state.Loading = false;
                state.createPostError = action.payload.message;
                state.createPostSuccess = false;
              })
            }
})

export default postSlice.reducer
