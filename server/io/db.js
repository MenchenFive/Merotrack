const Sequelize = require('sequelize');
const config = require("./configloader.js");

const sequelize = new Sequelize
(
    'merotrackerdb', 
    'postgres', 
    'ALFARRIGAN', 
{
    host: '192.168.1.101',
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

sequelize.query('SELECT NOW();')
    .then(([results, metadata]) => {
        console.log(results);
      })
    .catch(console.log('patata'));

module.exports = {
    sequelize,
    operator
}

