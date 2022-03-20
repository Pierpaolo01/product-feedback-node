import express from "express";
import authController from "../controllers/authController.js";

const routes = express.Router()

routes.post('/signup', authController.signupHandler)

routes.post('/login', authController.loginHandler)

// routes.use('/api', protectedRoutes)

export default routes
