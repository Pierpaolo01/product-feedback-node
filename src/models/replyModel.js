import {DataTypes} from "sequelize";
import database from "../database/database.js";

const replyModel = database.define('reply', {
    reply: {
        type: DataTypes.STRING,
    }
})

export default replyModel
