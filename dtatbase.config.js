var mysql = require('mysql');

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'ORDER_RICE'
};

var connection = mysql.createConnection(options); // or mysql.createPool(options);

module.exports = connection