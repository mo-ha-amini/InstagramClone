import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const backendURL = `https://localhost:7198`
// console.log(backendURL)
// export const getToken = () => {
//     return JSON.parse(localStorage.getItem('token'))
// }

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/User/Login`,
                { username, password },
                config
            )
            localStorage.setItem('user', JSON.stringify(data.data))
            return data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const SignIn = createAsyncThunk(
    'auth/SignIn',
    async ({ username, password, email, gender, name, phoneNumber}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            console.log({username, password, email, gender, name, phoneNumber })

            const { data } = await axios.post(
                `${backendURL}/api/User/SignIn`,
                {username, password, email, gender, name, phoneNumber, bio:'' },
                config
            )
            // console.log({username, password, email, gender, name, bio, phoneNumber })
            return data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  return null;
});
