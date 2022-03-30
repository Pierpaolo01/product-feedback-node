import {Router} from 'express'
import isAuth from "../helpers/isAuth.js";

const commentsRoutes = Router()

commentsRoutes.get('suggestions/:id/comments:')

commentsRoutes.post('suggestion/:sug_id/comment', isAuth,)

export default commentsRoutes
