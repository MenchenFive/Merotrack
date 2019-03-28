const { Pool } = require('pg');
const config = require("./configloader.js");

const pool = new Pool({
    database: config.database,
    host: config.host,
    password: config.password,
    user: config.user,
    port: config.port,
    max: config.max_pool,
    min: config.min_pool,
});

module.exports = {
    query : (text, params) => {
        return pool.query(text, params)
    }
};