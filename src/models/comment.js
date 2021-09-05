const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Comment extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
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

  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "post",
      key: "id",
    },
    onDelete: "CASCADE",
  },
};

const options = {
  sequelize,
  modelName: "comment",
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

Comment.init(schema, options);

module.exports = Comment;
