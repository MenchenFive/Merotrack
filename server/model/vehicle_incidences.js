const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');

const Incidence = sequelize.define('vehicleIncidences', {
    id: {
      type: Sequelize.INTEGER,
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
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'title'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'description'
    },
    dateStart: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'date_start'
    },
    dateEnd: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      field: 'date_end'
    }
  }, {
    tableName: 'vehicle_incidences',
    timestamps: false
  });

module.exports = Incidence;
