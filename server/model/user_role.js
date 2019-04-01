const Sequelize = require('sequelize');
const { sequelize , operator } = require('../io/db.js');


const User_role = sequelize.define( 'USER_ROLE' , {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : { 
            len: [1,32]
        }
    },
    perm_users: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perm_vehicles: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perm_incidences: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perm_trips: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User_role;