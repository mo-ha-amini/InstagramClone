import { createSlice } from '@reduxjs/toolkit'
import {createComment, getComment} from './commentAction'

const initialState = {
    Loading: false,
    Comments: [],
    getCommentsError: null,
    getCommentsSuccess: false, 

    createCommentError: null,
    createCommentSuccess: false, 
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(createComment.pending, (state) => {
                state.Loading = true;
                state.createCommentSuccess = false;
              })
              .addCase(createComment.fulfilled, (state, action) => {
                state.Loading = false;
                state.createCommentSuccess = action.payload.isSuccess;
                state.createCommentError = action.payload.message;
              })
              .addCase(createComment.rejected, (state, action) => {
                state.Loading = false;
                state.createCommentError = action.payload.message;
                state.createCommentSuccess = false;
              })
              .addCase(getComment.pending, (state) => {
                state.Loading = true;
                state.getCommentsSuccess = false;
              })
              .addCase(getComment.fulfilled, (state, action) => {
                state.Loading = false;
                state.Comments = action.payload.data;
                state.getCommentsSuccess = action.payload.isSuccess;
                state.getCommentsError = action.payload.message;
              })
              .addCase(getComment.rejected, (state, action) => {
                state.Loading = false;
                state.getCommentsError = action.payload.message;
                state.getCommentsSuccess = false;
              })

            }
})

export default commentSlice.reducer
