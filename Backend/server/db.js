const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:ALFARRIGAN@127.0.0.1:5432/mapdb';

const pool = new Pool({
  connectionString: connectionString,
  max
})

pool.query("SELECT * FROM import.osm_roads WHERE UPPER(name) LIKE '%S DEL PERD%' ", (err, res) => {
  console.log(err, res)
  pool.end()
})
