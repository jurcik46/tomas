var mysql = require('mysql')
var dbConfig = require("./config.js");
var connection = mysql.createConnection(dbConfig.db);