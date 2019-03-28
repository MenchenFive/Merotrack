const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('server/config.ini', 'utf-8'));

module.exports = {
    user: config.database.user,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    min_pool: config.database.minimum_pool_connections,
    max_pool: config.database.maximum_pool_connections
}