const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');

const Role = sequelize.define('userRoles', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      field: 'name'
    },
    permUsers: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'perm_users'
    },
    permVehicles: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'perm_vehicles'
    },
    permIncidences: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'perm_incidences'
    },
    permTrips: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'perm_trips'
    }
  }, {
    tableName: 'user_roles',
    timestamps: false
  });

  
module.exports = Role;
