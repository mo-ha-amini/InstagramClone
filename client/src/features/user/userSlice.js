// import { createSlice } from '@reduxjs/toolkit'
// import { allusers, getUserByUserId, allLegalUsers, getLegalUserByUserId, getActiveUser } from './userAction'

// const initialState = {
//     loading: false,
//     user: null,
//     users: [],
//     error: null,
//     success: false,
//     legalUser: null,
//     legalUsers: [],
//     activeUser: []
// }

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     extraReducers: {
//         [allusers.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [allusers.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.users = payload
//             state.success = true
//         },
//         [allusers.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },
//         [getUserByUserId.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [getUserByUserId.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.users = payload.user
//         },
//         [getUserByUserId.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },
//         [allLegalUsers.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [allLegalUsers.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.users = payload.legalUsers
//         },
//         [allLegalUsers.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },
//         [getLegalUserByUserId.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [getLegalUserByUserId.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.legalUser = payload.legalUser
//         },
//         [getLegalUserByUserId.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },

//         [getActiveUser.pending]: (state) => {
//             state.loading = true
//             state.error = null
//         },
//         [getActiveUser.fulfilled]: (state, { payload }) => {
//             state.loading = false
//             state.activeUser = payload
//         },
//         [getActiveUser.rejected]: (state, { payload }) => {
//             state.loading = false
//             state.error = payload
//         },
//     },
// })

// export default userSlice.reducer
