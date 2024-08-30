import { createSlice } from '@reduxjs/toolkit'
import { login} from './authActions'

const user =
    localStorage.getItem('user') && localStorage.getItem('user') != 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : null

const initialState = {
    loginLoading: false,
    user,
    loginError: null,
    LoginSuccess: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder
              .addCase(login.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
                state.LoginSuccess = false;
              })
              .addCase(login.fulfilled, (state, action) => {
                state.loginLoading = false;
                state.user = action.payload.data;
                state.LoginSuccess = action.payload.isSuccess;
              })
              .addCase(login.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload.message;
                state.LoginSuccess = false;
              });
            }
})

export default authSlice.reducer
