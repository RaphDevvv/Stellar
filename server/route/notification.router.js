import { Router } from "express";
import auth from "../middleware/auth.js";
import { checkIfUnread, fetchNotifications, setAsRead } from "../controllers/notification.controller.js";

const notificationRouter = Router()

notificationRouter.get('/get', auth, fetchNotifications)
notificationRouter.get('/check-unread', auth, checkIfUnread)
notificationRouter.post('/set-as-read', auth, setAsRead)

export default notificationRouter