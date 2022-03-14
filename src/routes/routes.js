import express from "express";
import authController from "../controllers/authController.js";

const routes = express.Router()

routes.post('/signup', authController.signupHandler)

routes.post('/login', authController.loginHandler)

export default routes
