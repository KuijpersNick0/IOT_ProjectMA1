var socket = io();  

socket.on("SEND_DATA", function(data)  { 
    // Listen data from route "SEND_DATA"
    var strList = []; 
    strList = data.split(/[, ]+/); 

    document.getElementById('NowTemp1').innerHTML = strList[0]; 
    document.getElementById('NowHum1').innerHTML = strList[1];
    document.getElementById('NowMois1').innerHTML = strList[2];
 
    // const sqlInsert = "INSERT INTO croptemperature VALUES (?,?);";
    // connection.query(sqlInsert, ["70B3D57ED0055DBB", strList[0]], (error, resultSQL) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     else{
    //         console.log("Ajouté a table 'fournisseur_delete'");
    //     } 
    // })
 
});

function requestGetDataAfterATime() {
    //Pour si besoin bouton refresh ds ejs
    socket.emit("REQUEST_GET_DATA");
}
 