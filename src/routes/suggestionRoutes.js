import express from "express"
import isAuth from "../helpers/isAuth.js";
import suggestionController from "../controllers/suggestionController.js";
import CommentController from "../controllers/commentController.js";
import suggestionModel from "../models/suggestionModel.js";

const suggestionRoutes = express.Router()

suggestionRoutes.get('/suggestions', isAuth, suggestionController.getAllSuggestions)

suggestionRoutes.get('/suggestion/:id', isAuth, suggestionController.getSingleSuggestion)

suggestionRoutes.post('/create-suggestion', isAuth, suggestionController.createSuggestion)

suggestionRoutes.patch('/suggestion/:id', isAuth, suggestionController.patchSuggestion)

suggestionRoutes.delete('/suggestion/:id', isAuth, suggestionController.deleteSuggestion)

suggestionRoutes.get('/suggestion/:id/comments', isAuth, CommentController.getAllComments)

suggestionRoutes.post('/suggestion/:id/comment', isAuth, CommentController.createComment)

suggestionRoutes.delete('/suggestion/:id/comment', isAuth, CommentController.deleteComment)

export default suggestionRoutes
