const { response } = require('express');
let connection = require('../db');

let croptemperatures = []
let crophumidities = []



exports.chart = function(request, response){
    const sqlInsert = "SELECT * FROM croptemperature";
    connection.query(sqlInsert, function(err, result){
        if (err) throw err;
        croptemperatures.push(result)
    });
};
