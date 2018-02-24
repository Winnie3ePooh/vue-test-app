const mysql = require('mysql');

const pool = mysql.createPool({
	host: 'www.db4free.net',
	port: 3307,
	user: 'maks1839',
	password: 'maks1893',
	database: 'vuetesttask'
});

module.exports = pool;