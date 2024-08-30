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
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `https://localhost:7198/api/User/Login`,
                { username, password },
                config
            )
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
