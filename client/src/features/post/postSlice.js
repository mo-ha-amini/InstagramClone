import { createSlice } from '@reduxjs/toolkit'
import { getUserPosts, createPosts } from './postAction'

const initialState = {
    Loading: false,
    Posts: null,
    getPostError: null,
    getPostSuccess: false,

    createPostError: null,
    createPostSuccess: false,
    
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
            }
})

export default postSlice.reducer
