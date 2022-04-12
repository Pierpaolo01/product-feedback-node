import express from "express";
import authController from "../controllers/authController.js";
import isAuth from "../helpers/isAuth.js";

const authRoutes = express.Router()

authRoutes.post('/signup', authController.signupHandler)

authRoutes.post('/login', authController.loginHandler)

authRoutes.get('/api/user', isAuth, authController.getAuthenticatedUser)

export default authRoutes
