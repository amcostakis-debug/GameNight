const mysql = require("mysql2/promise");

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MyNewPass123!",  // the password you set
  database: "my_project_db" // the database you just created
});

module.exports = con;
