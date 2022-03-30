import express from "express"
import isAuth from "../helpers/isAuth.js";
import suggestionController from "../controllers/suggestionController.js";

const suggestionRoutes = express.Router()

suggestionRoutes.get('/suggestions', isAuth, suggestionController.getAllSuggestions)

suggestionRoutes.get('/suggestion/:id', isAuth, suggestionController.getSingleSuggestion)

suggestionRoutes.post('/create-suggestion', isAuth, suggestionController.createSuggestion)

suggestionRoutes.patch('/suggestion/:id', isAuth, suggestionController.patchSuggestion)

suggestionRoutes.delete('/suggestion/:id', suggestionController.deleteSuggestion)

export default suggestionRoutes
