import { Router } from "express";
import auth from "../middleware/auth.js";
import uploadImagesController from "../controllers/image.controller.js";
import upload from "../middleware/multer.js";

const imageRouter = Router()

imageRouter.post('/upload', auth, upload.single("image"), uploadImagesController)

export default imageRouter