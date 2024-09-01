import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const backendURL = `https://localhost:7198`

export const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token
}

export const getfollowings = createAsyncThunk(
    'user/getfollowings',
    async ({userId},{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + String(getToken()),
                },
            }
            // console.log(userId)
            const { data } = await axios.post(
                `${backendURL}/api/User/GetFollowings?UserId=${userId}`,
                config
            )
            // console.log(data)
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

export const getfollowers= createAsyncThunk(
    'user/getfollowers',
    async ({userId},{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + String(getToken()),
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/User/GetFollowers?UserId=${userId}`,
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

export const Follow= createAsyncThunk(
    'user/Follow',
    async ({followingId},{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(getToken()),
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/User/Follow?followingId=${followingId}`,
                {},
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

export const UnFollow= createAsyncThunk(
    'user/UnFollow',
    async ({followingId},{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(getToken()),
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/User/UnFollow?followingId=${followingId}`,
                {},
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
