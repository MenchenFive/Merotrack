const Sequelize = require('sequelize');
const { sequelize, operator } = require('../io/db.js');

const Stage = sequelize.define('tripStages', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    dateA: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'date_a'
    },
    dateB: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'date_b'
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'comments'
    },
    refTrip: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'id'
      },
      field: 'ref_trip'
    },
    geom: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false,
      field: 'address_a'
    }
  }, {
    tableName: 'trip_stages',
    timestamps: false
  });


module.exports = Stage;
