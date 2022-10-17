const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '2316',
    database: 'stock_db',
    host: 'localhost',
    port: 3306
})

exports.pool = pool;