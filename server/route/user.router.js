import { Router } from "express";
import { editUser, fetchUserAndPostsByName, fetchUserDetails, fetchUserPosts, followUser, loginUser, logoutUser, register, uploadAvatar } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', loginUser)
userRouter.get('/get', auth, fetchUserDetails)
userRouter.post('/logout', auth ,logoutUser)
userRouter.post('/avatar', auth, uploadAvatar)
userRouter.post('/get-posts', auth, fetchUserPosts)
userRouter.put('/edit', auth, editUser)
userRouter.post('/get-info-by-name', auth, fetchUserAndPostsByName)
userRouter.post('/follow', auth, followUser)

export default userRouter