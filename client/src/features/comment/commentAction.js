import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const backendURL = `https://localhost:7198`

export const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token
}

export const createComment = createAsyncThunk(
    'Comment/createComment',
    async ({ PostId, CommentText }, { rejectWithValue }) => {
        try {
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(getToken()),
                },
            };

            const { data } = await axios.post(
                `${backendURL}/api/Comment/CreateComment`,
                {PostId, CommentText},
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
