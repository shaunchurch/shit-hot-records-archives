const mysql = require("mysql");
const connection = mysql.createConnection({
  // host: "db33.cv4svjhurehk.eu-west-1.rds.amazonaws.com",
  host: "db33-restore.cv4svjhurehk.eu-west-1.rds.amazonaws.com",
  user: "shr",
  password: process.env.DB_PASS,
  database: "shr",
});

export default connection;
