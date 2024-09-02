import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

import auth from '../features/auth/authSlice'
import post from '../features/post/postSlice'
import profile from '../features/profile/profileSlice'
import user from '../features/user/userSlice'
import comment from '../features/comment/commentSlice'





const store = configureStore({
    reducer: {
        auth,
        post,
        profile,
        user,
        comment,
    },

    middleware: (getDefaultMiddleware) => {
        return [
            ...getDefaultMiddleware({
                serializableCheck: false,
            }),
            thunk,
        ]
    },
})

export default store
