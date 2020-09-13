const { createPool } = require("mysql");

var mysql = require('mysql');
var pool = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password :process.env.DB_PASS ,
  database : process.env.MYSQL_DB,
  port     : process.env.DB_PORT,
  charset  : 'BIG5_CHINESE_CI',
  timezone : '-0700'
});
pool.connect(function(err) {
  if (err) {
      console.log(err);
    // ...handle error...
    return;
  }
  console.log("Database Connected successfully...");
  
  // Otherwise everything worked!
  // You can use `connection` here.
});

module.exports = pool;
/*
const pool = createPool({
    
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.BD_PASS,
    database:process.env.MYSQL_DB,
    connectionLimit: 10
});

module.exports = pool;*/