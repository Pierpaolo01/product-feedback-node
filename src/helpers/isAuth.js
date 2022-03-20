import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const isAuth = (req, res, next) => {
    const token = req.header.Authorization;

    if (!token) res.status(401).send('No token')

    if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
        next()
    }

    res.status(401).send("UNAUTHENTICATED")
}

export default isAuth
