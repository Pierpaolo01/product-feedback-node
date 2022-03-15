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

            if (existingUser) res.status(422).send('Email already in use')

            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const refreshToken = jwt.sign({email, name,}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15m'})

            const newUser = await userModel.create({
                name,
                email,
                hashed_password: hashedPassword,
                refresh_token: refreshToken,
            })

            res.status(201).send({user: newUser})

        } catch (err) {
            res.status(500).send({message: err})
        }
    }

    static loginHandler = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        try {
            const user = await userModel.findOne({where: {email}})

            if (!user) res.status(401);

            if (!bcrypt.compare(user.password, password)) res.status(401)

            const token = jwt.sign({user_id: user.id, email,}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

            res.status(201).send({token})

        } catch (err) {
            res.status(500).send({error: err})
        }

    }
}
