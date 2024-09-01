import { createSlice } from '@reduxjs/toolkit'
import { getUserPosts } from './postAction'

const initialState = {
    Loading: false,
    Posts: null,
    getPostError: null,
    getPostSuccess: false,
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
            }
})

export default postSlice.reducer
