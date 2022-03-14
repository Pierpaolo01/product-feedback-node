import {Sequelize} from "sequelize";

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, '',
    {
        dialect: "mysql",
        port: process.env.DB_PORT,
    })
export default db
