import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

// import auth from "../pages/auth/common/store";
// import auth from '../features/auth/authSlice'
// import request from '../features/request/requestSlice'
// import user from '../features/user/userSlice'
// import session from '../features/session/sessionSlice'
// import invitation from '../features/invitation/invitationSlice'
// import enactment from '../features/enactment/enactmentSlice'
// import dataItem from '../features/dataItem/dataItemSlice'

const store = configureStore({
    reducer: {
        // user,
        // auth,
        // request,
        // session,
        // invitation,
        // enactment,
        // dataItem,
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
