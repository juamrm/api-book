import connection_db from "../database/connectionDB.js";
import { Sequelize, DataTypes } from "sequelize";

const bookModel = connection_db.define(
  "Book",
  {
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default bookModel;
