import express from 'express'
import {config } from 'dotenv'
config()

import db from './src/database/database.js'
import routes from './src/routes/routes.js'
import authRoutes from "./src/routes/authRoutes.js";
import suggestionsModel from "./src/models/suggestionModel.js";
import userModel from "./src/models/userModel.js";
import commentModel from "./src/models/commentModel.js";
import replyModel from './src/models/replyModel.js'

const app = express()

// Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})

app.use(express.json())

//Routes
app.use(authRoutes)
routes(app)

//Relationships <3
suggestionsModel.belongsTo(userModel)

commentModel.belongsTo(userModel)
commentModel.belongsTo(suggestionsModel)

replyModel.belongsTo(commentModel)
replyModel.belongsTo(userModel)
db
    // .sync({force: true})
    .sync()
    .then(async () => {

        const default_user = await userModel.findOne({where: { name: process.env.DEFAULT_USER_NM }})

        if (!default_user) {
            await userModel.create({
                name: process.env.DEFAULT_USER_NM,
                email: process.env.DEFAULT_USER_EM,
                hashed_password: process.env.DEFAULT_USER_PW,
                permissions: [
                    'DELETE_ANY_SUGGESTION',
                    'UPDATE_ANY_SUGGESTION',
                    'DELETE_ANY_COMMENT',

                ]
            })
        }

        app.listen(5001)
        console.log('app running on port 5001')
    })

