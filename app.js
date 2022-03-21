import express from 'express'
import {config } from 'dotenv'
config()

import db from './src/database/database.js'

import routes from "./src/routes/routes.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";
import suggestionsModel from "./src/models/suggestionsModel.js";
import userModel from "./src/models/userModel.js";

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})


app.use(express.json())

app.use(routes)
app.use('/api', protectedRoutes)

suggestionsModel.belongsTo(userModel)

db
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(5001)
        console.log('app running on port 5001')
    })

