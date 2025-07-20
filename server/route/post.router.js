import { Router } from "express";
import { fetchComments, fetchMostLiked, getPostById, getPostsController, ratePost, uploadComment, uploadPostController } from "../controllers/post.controller.js";
import auth from "../middleware/auth.js";

const postRouter = Router()

postRouter.post('/upload', auth ,uploadPostController)
postRouter.get('/get', auth, getPostsController)
postRouter.put('/rate', auth, ratePost)
postRouter.post('/post-comment', auth, uploadComment)
postRouter.post('/fetch-comments', auth, fetchComments)
postRouter.get('/most-liked', auth, fetchMostLiked)
postRouter.post('/get-by-id', auth, getPostById)

export default postRouter