import database from "../database/database.js";
import {DataTypes} from "sequelize";

const suggestionsModel = database.define('suggestion', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    comments: {
        type: DataTypes.JSON,
    }
})

export default suggestionsModel
