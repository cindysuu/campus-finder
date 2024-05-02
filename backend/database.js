// import * as dotenv from 'dotenv';
// import * as mysql from 'mysql';

// dotenv.config();

require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'localhost',
    // user: 'user',
    password: 'Password1!',
    database: 'myappdb'
});

module.exports = pool;