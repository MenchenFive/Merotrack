const Sequelize = require('sequelize');
const config = require("./configloader.js");

const sequelize = new Sequelize
(
    'merotrackerdb', 
    'postgres', 
    'ALFARRIGAN', 
{
    host: 'localhost',
    dialect: 'postgres',
    protocol: 'postgres',
    port:'5432',

    pool: {
        max: 20,
        min: 1,
        idle: 10
    }
});

const operator = Sequelize.Op;

module.exports = {
    sequelize,
    operator
}

