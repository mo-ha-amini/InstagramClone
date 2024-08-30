// import axios from 'axios'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'
// import { useDispatch } from 'react-redux'

// const backendURL = `${import.meta.env.VITE_BACKEND_URL}/api`
// console.log(backendURL)
// export const getToken = () => {
//     return JSON.parse(localStorage.getItem('token'))
// }

// export const getUser = createAsyncThunk(
//     'auth/getUser',
//     async ({}, { rejectWithValue }) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + String(getToken()),
//                 },
//             }

//             const { data } = await axios.get(`${backendURL}/v1/getUser`, config)

//             // console.log(data)
//             // console.log(localStorage.setItem(localStorage.setItem('tokenName', JSON.stringify(data.access))))
//             // localStorage.setItem('tokenName', JSON.stringify(data.access))
//             localStorage.setItem('user', JSON.stringify(data[0]))
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

// export const userLogin = createAsyncThunk(
//     'auth/login',
//     async ({ identifier, password }, { rejectWithValue }) => {
//         try {
//             // configure header's Content-Type as JSON
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }

//             const { data } = await axios.post(
//                 `${backendURL}/v1/login/`,
//                 { identifier, password },
//                 config
//             )

//             localStorage.setItem('token', JSON.stringify(data.access))
//             return data.access
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

// export const updateUserLastLogin = createAsyncThunk(
//     'auth/updateUserLastLogin',
//     async ({ national_code }, { rejectWithValue }) => {
//         try {
//             // configure header's Content-Type as JSON
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }

//             await axios.patch(
//                 // `${backendURL}/login`,
//                 '/api/last_login',
//                 { national_code },
//                 config
//             )

//             // localStorage.setItem('token', data.token)
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

// export const registerUser = createAsyncThunk(
//     'auth/register',
//     async (userData, { rejectWithValue }) => {
//         try {
//             const config = {
//                 withCredentials: true,
//                 // headers: {
//                 //   'Content-Type': 'application/json',
//                 // },
//             }

//             const { data } = await axios.post(
//                 `${backendURL}/v1/register/user/`,
//                 userData,
//                 config
//             )
//             // console.log(data)
//         }catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )

// export const logoutUser = createAsyncThunk(
//     'auth/logout',
//     async ({ rejectWithValue }) => {
//         try {
//             await axios.get(`/logout`)
//             localStorage.removeItem('isAuth')
//             localStorage.removeItem('user')

//             toast.success('کاربر با موفقیت خارج شد.', {
//                 position: 'top-right',
//                 autoClose: 1500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'light',
//                 rtl: true,
//                 className: 'font-iransans',
//             })
//         } catch (error) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
