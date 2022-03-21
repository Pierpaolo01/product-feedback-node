import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const isAuth = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    if (!token) res.status(401).send("UNAUTHENTICATED")

    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken)
        req.userId = decodedToken.user_id
        next()
    } catch (err) {
        console.log({err})
        res.status(403).send('Authorization failed')
    }
}

export default isAuth
