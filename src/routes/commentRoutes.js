import {Router} from "express";
import isAuth from "../helpers/isAuth.js";
import CommentController from "../controllers/commentController.js";

const commentRoutes = Router()

commentRoutes.get('/suggestion/:id/comments', isAuth, CommentController.getAllComments)

commentRoutes.post('/suggestion/:id/comment', isAuth, CommentController.createComment)

commentRoutes.delete('/suggestion/:id/comment/:commentId', isAuth, CommentController.deleteComment)

commentRoutes.get('/comment/:id/replies', isAuth, CommentController.getAllCommentReplies)

commentRoutes.post('/comment/:id/replies', isAuth, CommentController.createCommentReply)

commentRoutes.delete('/comment/reply/:replyId', isAuth, CommentController.deleteReply)

export default commentRoutes
