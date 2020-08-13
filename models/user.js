const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      unique: true,
      isEmail: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 6,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password, 10); // Hashear password con una sal de 10 rondas
      },
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

sequelize
  .sync()
  .then(() => console.log('User table synchronized'))
  .catch((err) =>
    console.error('An error ocurred while synchronizing User table', err)
  );
  
module.exports = User;