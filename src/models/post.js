const { Model, DataTypes } = require("sequelize");
const moment = require("moment");

const sequelize = require("../config/connection");

class Post extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
    onDelete: "CASCADE",
  },
};

const options = {
  sequelize,
  modelName: "post",
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

Post.init(schema, options);

module.exports = Post;
