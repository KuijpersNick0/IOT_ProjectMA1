const mqtt = require('mqtt')
var express = require('express'); 
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//Middleware; css/img/js
app.use(express.static('public'));

const host = 'eu1.cloud.thethings.network' 
const port = '1883' 

let GlobalData = 0;

//Server
var server = require("http").Server(app);
var io = require("socket.io")(server); 

server.listen(process.env.PORT || 3000, () => { 
   console.log('J ecoute au port 3000 socket');
});

//MQTT
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, { 
    clean: true,
    connectTimeout: 4000,
    username: 'iot-group3@ttn',
    password: 'NNSXS.E4RI4XRQL4HTRVGYELCKTAZYAXUW4FP5FM3C2EY.SJQH5N2EG7YMJ37MP56ZCZQUSIW2CZUX77QEWLUOPI7U4TFN7NDA',
    reconnectPeriod: 1000,
})

client.on('connect', () => {
    var topic = "v3/iot-group3@ttn/devices/eui-70b3d57ed0055dbb/up"; 
    console.log('Connected')
    client.subscribe(topic); //single topic
    console.log("Connected + subscribed");
});

//handle errors
client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});

//handle incoming messages
client.on("message", function (topic, message) {
    var getDataFromTTN = JSON.parse(message);
    try {
        var temperature = JSON.parse(getDataFromTTN.uplink_message.decoded_payload.degreesC).toFixed(2);
        var humidity = JSON.parse(getDataFromTTN.uplink_message.decoded_payload.humidity).toFixed(2);
        var moisissure = JSON.parse(getDataFromTTN.uplink_message.decoded_payload.mold).toFixed(2);
        console.log("Data from TTN:", temperature, humidity, moisissure);
    
        //var getFrmPayload =  getDataFromTTN.uplink_message.frm_payload;
        GlobalData = temperature + "," + humidity + "," + moisissure;
    }
    catch (e) {
        console.log(e);
    } 
}) 

//mes routes
let routes = require('./routes');
app.use('/', routes);

// SOCKET
io.on("connection", function(socket) {
    console.log("Client connected: " + socket.id);

    socket.on("disconnect", function() {
        console.log(socket.id + " disconnected");
    });

    socket.on("REQUEST_GET_DATA", function() {
        socket.emit("SEND_DATA", GlobalData);
    });

    //Toute les 2 secondes envoies de données du serveur 
    function intervalFunc() {
        socket.emit("SEND_DATA", GlobalData);
    }
    setInterval(intervalFunc, 2000);
});
