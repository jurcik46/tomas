var mysql = require('mysql')
var dbConfig = require("./config.js");
var connection = mysql.createConnection(dbConfig.db);

function execute(query, params, result){
    connection.connect();
    connection.query(query ,params, result);
    connection.end();
}


module.exports = {execute}