import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    status: "",
    role : ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.role = action.payload?.role
        }, 

        updateAvatar : (state,action) =>{
            state.avatar = action.payload
        },

        userLeave : (state,action) => {

            state._id = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
            state.status = ""
            state.role = ""
        }
    }
})

export const { setUserDetails, userLeave, updateAvatar} = userSlice.actions

export default userSlice.reducer