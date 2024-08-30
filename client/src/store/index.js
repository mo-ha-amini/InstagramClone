import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

import auth from '../features/auth/authSlice'

const store = configureStore({
    reducer: {
        auth,
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
