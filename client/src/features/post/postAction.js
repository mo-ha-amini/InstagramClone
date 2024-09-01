import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const backendURL = `https://localhost:7198`

export const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token
}

export const getUserPosts = createAsyncThunk(
    'auth/getUserPosts',
    async ({ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(getToken()),
                },
            }
            const { data } = await axios.get(
                `${backendURL}/api/Post/GetUserPostById`,
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

export const createPosts = createAsyncThunk(
    'post/createPosts',
    async ({ Caption, MediaFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('Caption', Caption);
            formData.append('MediaFile', MediaFile);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + String(getToken()),
                },
            };

            const { data } = await axios.post(
                `${backendURL}/api/Post/CreatePost`,
                formData,
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);