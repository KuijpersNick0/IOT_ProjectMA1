let connection = require('../db');
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Crop 1 data temperature over time',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        data: [0, 10, 5, 2, 20, 30, 45],    
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// const sqlInsert = "INSERT INTO nomenclature(idNomenclature, idPiece, idProjet, idFournisseur) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE idNomenclature=idNomenclature";
// let todo = [idNomenclature, idPiece, idProjet, idFournisseur];
// connection.query(sqlInsert, todo, function(err, result){
//     if (err) throw err;
//     console.log("ajout bdd");
// });