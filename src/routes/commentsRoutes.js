import express from "express"
import isAuth from "../helpers/isAuth.js";
import CommentController from "../controllers/commentController.js";

const commentsRoutes = express.Router()

commentsRoutes.get('suggestions/:sug_id/comments', isAuth, CommentController.getAllComments)

commentsRoutes.post('suggestion/:id/comment', isAuth, CommentController.createComment)

// commentsRoutes.get('suggestion/:sug_id/comment/:com_id', isAuth)

export default commentsRoutes
