import { createSlice } from '@reduxjs/toolkit'
import { login, SignIn, logout} from './authActions'

const user =
    localStorage.getItem('user') && localStorage.getItem('user') != 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : null

const initialState = {
    loginLoading: false,
    user,
    loginError: null,
    LoginSuccess: false,

    signInLoading: false,
    signInError: null,
    signInSuccess: false,

    logoutSuccess: false,

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
                state.loginError = action.payload.message;
              })
              .addCase(login.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload.message;
                state.LoginSuccess = false;
              })

              .addCase(SignIn.pending, (state) => {
                state.signInLoading = true;
                state.signInError = null;
                state.signInSuccess = false;
              })
              .addCase(SignIn.fulfilled, (state, action) => {
                state.signInLoading = false;
                state.signInSuccess = action.payload.isSuccess;
              })
              .addCase(SignIn.rejected, (state, action) => {
                state.signInLoading = false;
                state.signInError = action.payload.message;
                state.signInSuccess = false;
              })

              .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.logoutSuccess = true;
                state.signInSuccess = false;
              });
            }
})

export default authSlice.reducer
