require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const pool = new Pool();

(async function() {
  const client = await pool.connect();
  const nationalPartHuts = fs.readFileSync("./national-park.json");
  console.log(nationalPartHuts);
  const { rows: huts } = await client.query(`select * from huts;`);
  console.log(huts);
})();
