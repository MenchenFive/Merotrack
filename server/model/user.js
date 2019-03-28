const Sequelize = require('sequelize');

class User extends Model {}

//TODO Averiguar como cojones funciona esta mierda

User.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
}, {
  sequelize,
  // options
});