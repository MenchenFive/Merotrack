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
    ref_vehicle: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id'
      },
      field: 'ref_vehicle'
    },
    course: {
      type: Sequelize.REAL,
      allowNull: false,
      field: 'course'
    },
    satellites: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      field: 'satellites'
    },
    speed: {
      type: Sequelize.REAL,
      allowNull: false,
      field: 'speed'
    },
    geom: {
      type: Sequelize.GEOMETRY('POINT',4326),
      allowNull: false,
      field: 'geom'
    }
  }, {
    tableName: 'vehicle_position',
    timestamps: false
  });

module.exports = Vehicle_position;
