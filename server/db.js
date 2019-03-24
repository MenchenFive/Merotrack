//dyndns db test

const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:ALFARRIGAN@merotracker.duckdns.org:5432/merotrackingdb';

const pool = new Pool({
  connectionString: connectionString
});

pool.query("SELECT * FROM import.osm_roads WHERE UPPER(name) LIKE '%S DEL PERD%' ", (err, res) => {
  console.log(err, res);
  pool.end();
});
