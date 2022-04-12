import { DataTypes } from "sequelize";
import db from '../database/database.js'

const userModel = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.JSON,
    },
    email_validated_at: {
        type: DataTypes.STRING,
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.STRING,
    }
})

export default userModel
