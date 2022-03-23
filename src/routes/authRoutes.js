import express from "express";
import authController from "../controllers/authController.js";

const authRoutes = express.Router()

authRoutes.post('/signup', authController.signupHandler)

authRoutes.post('/login', authController.loginHandler)

export default authRoutes
