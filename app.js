import express from 'express'
import {config} from "dotenv"; config()

import db from './src/database/database.js'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


db
    .sync()
    .then(() => {
        app.listen(5001)
    })

