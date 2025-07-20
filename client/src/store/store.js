import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import notificationReducer from './NotificationsSlice'

export default configureStore({
    reducer: {
        user : useReducer,
        notification : notificationReducer
    }
})