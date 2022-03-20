import express from "express"
import isAuth from "../helpers/isAuth.js";
import protectedController from "../controllers/protectedController.js";

const protectedRoutes = express.Router()

protectedRoutes.post('/protected-content', isAuth, protectedController.test)

export default protectedRoutes
