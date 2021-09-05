const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const hooks = require("../hooks");
const sequelize = require("../config/connection");

class User extends Model {
  async isCorrectPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const options = {
  hooks,
  sequelize,
  modelName: "user",
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

User.init(schema, options);

module.exports = User;
