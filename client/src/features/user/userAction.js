// import axios from 'axios'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'

// const backendURL = `${import.meta.env.VITE_BACKEND_URL}`

// export const getToken = () => {
//     return JSON.parse(localStorage.getItem('token'))
// }

// export const allusers = createAsyncThunk(
//     'user/allUser',
//     async ({}, { rejectWithValue }) => {
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer ' + String(getToken()),
//                 },
//             }
//             const { data } = await axios.get(
//                 `${backendURL}/api/v1/active-users/`,
//                 config
//             )
//             return data
//         } catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
// export const getUserByUserId = createAsyncThunk(
//     'user/getUserByUserId',
//     async ({ user_id }, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`/api/user/${user_id}`)
//             // console.log(data)
//             return data
//         } catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
// export const allLegalUsers = createAsyncThunk(
//     'user/allLegalUser',
//     async ({ rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`/api/legal-users`)
//             return data
//         } catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
// export const getLegalUserByUserId = createAsyncThunk(
//     'user/getLegalUserByUserId',
//     async ({ user_id }, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`/api/legal-user/${user_id}`)
//             console.log(data)
//             return data
//         } catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )

// export const getActiveUser = createAsyncThunk(
//     'users/getActiveUser',
//     async ({}, { rejectWithValue }) => {
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer ' + String(getToken()),
//                 },
//             }
//             // Replace with your actual Mirage JS API endpoint
//             const { data } = await axios.get(
//                 `${backendURL}/api/v1/active-users/`,
//                 config
//             )
//             return data
//         } catch (error) {
//             // Handle errors appropriately
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
