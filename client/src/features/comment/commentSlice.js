import { createSlice } from '@reduxjs/toolkit'
import {createComment} from './commentAction'

const initialState = {
    Loading: false,
    Comments: [],
    getCommentError: null,
    getCommentSuccess: false, 
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(createComment.pending, (state) => {
                state.Loading = true;
                state.getCommentSuccess = false;
              })
              .addCase(createComment.fulfilled, (state, action) => {
                state.Loading = false;
                state.getCommentSuccess = action.payload.isSuccess;
                state.getCommentError = action.payload.message;
              })
              .addCase(createComment.rejected, (state, action) => {
                state.Loading = false;
                state.getCommentError = action.payload.message;
                state.getCommentSuccess = false;
              })

            }
})

export default commentSlice.reducer
