import { Sequelize } from "sequelize";
import {config} from 'dotenv'
config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, '',
    {
        dialect: "mysql",
        port: 3306,
    })

export default db
