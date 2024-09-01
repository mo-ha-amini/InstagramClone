import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

import auth from '../features/auth/authSlice'
import post from '../features/post/postSlice'
import profile from '../features/profile/profileSlice'
import user from '../features/user/userSlice'




const store = configureStore({
    reducer: {
        auth,
        post,
        profile,
        user,
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
