// import { createSlice } from '@reduxjs/toolkit'
// import { registerUser, userLogin, logoutUser, getUser } from './authActions'

// const token =
//     localStorage.getItem('user') && localStorage.getItem('token') != 'undefined'
//         ? localStorage.getItem('token')
//         : null
// const user =
//     localStorage.getItem('user') && localStorage.getItem('user') != 'undefined'
//         ? JSON.parse(localStorage.getItem('user'))
//         : null

// const initialState = {
//     loading: false,
//     user,
//     token,
//     error: null,
//     success: false,
//     successRegister: false,
//     successLogout: false,
//     Loginsuccess: false,
//     Loginerror: null,
// }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         // setCredentials: (state, { payload }) => {
//         //     state.user = payload
//         // },
//         logout: (state) => {
//             localStorage.removeItem('token')
//             localStorage.removeItem('user')
//             state.token = null
//             state.user = null
//         },
//         reset: (state) => {
//             state.success = false
//             state.successRegister = false
//             state.Loginsuccess = false
//         },
//     },
//     extraReducers: {
//         [getUser.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [getUser.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.user = payload[0]
//         },
//         [getUser.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//             state.user = null
//             localStorage.removeItem('user')
//         },

//         [registerUser.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [registerUser.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.successRegister = true
//         },
//         [registerUser.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },

//         [userLogin.pending]: (state) => {
//             state.loading = true
//             state.Loginerror = null
//         },
//         [userLogin.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.Loginsuccess = true
//             state.token = payload
//         },
//         [userLogin.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.Loginerror = payload
//             state.Loginsuccess = false
//         },

//         [logoutUser.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },

//         [logoutUser.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.user = null
//             state.successLogout = true
//             state.success = false
//         },

//         [logoutUser.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },
//     },
// })

// export const { logout, reset } = authSlice.actions
// export default authSlice.reducer
