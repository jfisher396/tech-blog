const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(userpw) {
    return bcrypt.compareSync(userpw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // Takes the user's email address and makes all letters lower case before adding it to the database.
        newUserData.email = await newUserData.email.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
