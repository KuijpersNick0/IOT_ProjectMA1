var socket = io();
socket.on("SEND_DATA", function(data)  { 
    // Listen data from route "SEND_DATA"
    var strList = [];
    for (var i = 0 ; i < data.length; i++) {
        strList.append(data.charCodeAt(i).toString());
    }
    //Pour crop 1 test
    document.getElementById('NowTemp').innerHTML = strList[0]; 
    document.getElementById('NowHum').innerHTML = strList[1]; 
    document.getElementById('AvgTemp').innerHTML = strList[2]; 
    document.getElementById('AvgHum').innerHTML = strList[3]; 
});

function requestGetDataAfterATime() {
    //Pour si besoin bouton refresh ds ejs
    socket.emit("REQUEST_GET_DATA");
}