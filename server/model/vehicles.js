const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');

const Vehicle = sequelize.define('vehicles', {
    brand: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'brand'
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'model'
    },
    plate: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'plate'
    },
    publicId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'public_id'
    },
    privateId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'private_id'
    },
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    }
  }, {
    tableName: 'vehicles',
    timestamps: false
  });

module.exports = Vehicle;
