var socket = io();
socket.on("SEND_DATA", function(data)  { 
    // Listen data from route "SEND_DATA"
    var strList = [];
    // for (var i = 0 ; i < data.length; i++) {
    //     strList.push(data);
    // } 
    strList = data.split(/[, ]+/) ;

    document.getElementById('NowTemp1').innerHTML = strList[0]; 
    document.getElementById('NowHum1').innerHTML = strList[1];
    //document.getElementById('AvgTemp1').innerHTML = strList[2] 
    //document.getElementById('AvgHum1').innerHTML = strList[3];

    //document.getElementById('NowTemp2').innerHTML = strList[2]; 
    //document.getElementById('NowHum2').innerHTML = strList[3];
    //document.getElementById('AvgTemp2').innerHTML = strList[6]; 
    //document.getElementById('AvgHum2').innerHTML = strList[7];
});

function requestGetDataAfterATime() {
    //Pour si besoin bouton refresh ds ejs
    socket.emit("REQUEST_GET_DATA");
}