import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    hasUnread : false,
    unreadCount : 0
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialValue,
    reducers: {
        setNotifications: (state, action) => {
            state.hasUnread = action.payload?.hasUnread
            state.unreadCount = action.payload?.unreadCount
        }, 

    }
})

export const { setNotifications } = notificationSlice.actions

export default notificationSlice.reducer