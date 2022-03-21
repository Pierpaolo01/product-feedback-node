import express from "express"
import isAuth from "../helpers/isAuth.js";
import suggestionController from "../controllers/suggestionController.js";

const suggestionRoutes = express.Router()

suggestionRoutes.get('/suggestions', isAuth, suggestionController.getAllSuggestions)

suggestionRoutes.post('/create-suggestion', isAuth, suggestionController.createSuggestion)

export default suggestionRoutes
