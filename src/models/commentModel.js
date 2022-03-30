import {DataTypes} from "sequelize";
import database from "../database/database.js"

const commentModel = database.define('comment', {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default commentModel
