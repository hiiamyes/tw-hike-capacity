const getHuts = require("./getHuts");
const { Pool } = require("pg");

const pool = new Pool();
console.log(process.env.POSTGRES_DB);

(async () => {
  const client = await pool.connect();
  const huts = await getHuts();
  console.log(huts);
  // const { rows: users } = await client.query(
  //   `insert into huts (email, google_open_id) values ('${email}', '${google_id}') returning *;`
  // );
})();
