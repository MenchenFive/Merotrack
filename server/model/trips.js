const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trips', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'description'
    },
    refVehicle: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id'
      },
      field: 'ref_vehicle'
    }
  }, {
    tableName: 'trips',
    timestamps: false
  });
};
