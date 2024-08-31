import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const backendURL = `https://localhost:7198`
// console.log(backendURL)
// export const getToken = () => {
//     return JSON.parse(localStorage.getItem('token'))
// }

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async ({ username }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(
                `${backendURL}/api/User/GetUserProfileByUsername/${username}`,
                config
            )
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