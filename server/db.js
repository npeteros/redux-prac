require('dotenv').config();
const config = process.env;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
});

db.connect(e => {
    if (e) {
        console.error('Database connection failed: ', e.stack);
        return;
    }
    console.log('Connected to database');
})

module.exports = db;