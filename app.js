import express from 'express'
import {config } from 'dotenv'
config()

import db from './src/database/database.js'

import authRoutes from "./src/routes/authRoutes.js";
import suggestionRoutes from "./src/routes/suggestionRoutes.js";
import suggestionsModel from "./src/models/suggestionsModel.js";
import userModel from "./src/models/userModel.js";

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
app.use('/api', suggestionRoutes)

//Relationships <3
suggestionsModel.belongsTo(userModel)

db
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(5001)
        console.log('app running on port 5001')
    })

