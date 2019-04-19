const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');

const Vehicle_position = sequelize.define('vehiclePosition', {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'date'
    },
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    refVehicle: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id'
      },
      field: 'ref_vehicle'
    },
    geom: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false,
      field: 'position'
    }
  }, {
    tableName: 'vehicle_position',
    timestamps: false
  });

module.exports = Vehicle_position;
