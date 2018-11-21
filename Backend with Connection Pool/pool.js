var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: '127.0.0.1',
    user: 'root',
    password: 'Aditya@1311',
    database: 'smart_city_281',
	insecureAuth : true
})


module.exports = pool