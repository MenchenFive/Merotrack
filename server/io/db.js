const Sequelize = require('sequelize');
const config = require("./configloader.js");

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    port: config.port,

    pool: {
        max: config.max_pool,
        min: config.min_pool,
        acquire: 30000,
        idle: 10000
    }
});
