var mysql = require('mysql2')
var dbConfig = require("./config.js");
var connection = mysql.createConnection(dbConfig.db);

async function execute(query, params, result){
    connection.connect();
   var result = await connection.query(query ,params, result);
    connection.end();
    return result;
}


module.exports = {execute}