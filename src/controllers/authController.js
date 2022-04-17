import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {config} from 'dotenv'
config()

import userModel from "../models/userModel.js"


export default class authController {
    static signupHandler = async (req, res) => {
        const email = req.body.email
        const name = req.body.name

        try {
            const existingUser = await userModel.findOne({
                where: {
                    email: email,
                }
            })

            if (existingUser) {
                res.status(422).send('Email already in use')
                return
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const refreshToken = jwt.sign({email, name,}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15m'}, null)

            const newUser = await userModel.create({
                name,
                email,
                permissions: [],
                hashed_password: hashedPassword,
                refresh_token: refreshToken,
            })

            res.status(201).send({data: newUser})

        } catch (err) {
            res.status(500).send({data: err})
        }
    }

    static loginHandler = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        try {
            const user = await userModel.findOne({where: {email}})

            if (!user) res.status(401)

            bcrypt.compare(user.password, password, (err) => {
                if (err) res.status(401)

                const token = jwt.sign({user_id: user.id, email,}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}, null)
                res.status(201).send({token})
            })

        } catch (err) {
            console.log({err})
            res.status(500).send({error: err})
        }

    }

    static getAuthenticatedUser = async (req, res) => {
        const userId = req.user.id

        try {

            const authenticatedUser = await userModel.findOne({where: {id: userId}})
            if(!authenticatedUser) res.status(403).send("unauthenticate")

            res.status(200)
            res.send({data: authenticatedUser})

        } catch (e) {
            console.log({errors: e})
            res.status(500)
            res.send("Error getting user")
        }
    }
}
