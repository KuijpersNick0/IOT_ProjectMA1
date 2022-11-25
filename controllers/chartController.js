const { response } = require('express');
let connection = require('../db');

 
let crophumidities = []
 
exports.chart = function(request, response){
    let croptemperatures = [];
    const sqlSelect = "SELECT * FROM croptemperature";
    connection.query(sqlSelect, function(err, result){
        if (err) throw err;
        else {
            for (var i=0; i<result.length; i++){
                croptemperatures.push(result[i]);
            }
            //JSON.stringify(croptemperatures);
            response.json(croptemperatures);
        }
    });
};
 