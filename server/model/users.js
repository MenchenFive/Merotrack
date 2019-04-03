const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');
const role = require('./user_roles');

const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'name'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'email'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'password'
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'salt'
    },
    refRole: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_roles',
        key: 'id'
      },
      field: 'ref_role'
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });

module.exports = User;
