const Sequelize = require('sequelize');
const { sequelize , operator } = require('../io/db.js');

const User_role = require('./user_role.js');

const User = sequelize.define( 'user' , {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { 
            len: [4,32]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { 
            isEmail: true,
            len: [5,40]
        }
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ref_role: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.hasOne( User_role , { foreignKey: 'ref_role', targetKey: 'id', as: 'rol' } );
module.exports = User;