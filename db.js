var mysql = require("mysql");
var connection = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'mypass',
    database:'iot_g3',
    charset :'utf8'
});
connection.connect(function(error) {if(error) console.log(error);});

module.exports = connection; 