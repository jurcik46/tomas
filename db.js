var db = require('promise-mysql2');
var dbConfig = require("./config.js");

 async function run(query, params){
    var con = await db.createConnection(dbConfig.db);
    return await con.query(query, params);
}


module.exports = {run}