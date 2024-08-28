require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "db_s1_soundstream",
  password: "pwd123",
  port: 5432,
});

module.exports = pool;
