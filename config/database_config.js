// Connect to MySQL Database 
// --------------------------------------
const mysql 		= require('mysql'); 
const secret        = require ('./dev_keys.js'); 

const pool = mysql.createPool({
					connectionLimit: 10,
					host     : secret.MYSQL_DEV_HOST,
					user     : secret.MYSQL_DEV_USER,
					password : secret.MYSQL_DEV_PASS,
					database : secret.MYSQL_DEV_DB
				});

module.exports = pool; 
