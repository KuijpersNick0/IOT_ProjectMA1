const mqtt = require('mqtt')
var express = require('express'); 
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//Middleware; css/img
app.use(express.static('public'));

const host = 'eu1.cloud.thethings.network' 
const port = '1883' 

let GlobalData = 0;

//Server
var server = require("http").Server(app);
var io = require("socket.io")(server); 
server.listen(process.env.PORT || 3000, () => { 
   console.log('j ecoute au port 3000 socket');
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
    console.log("Data from TTN:", getDataFromTTN.uplink_message.frm_payload)
    var getFrmPayload =  getDataFromTTN.uplink_message.frm_payload;
    GlobalData = Buffer.from(getFrmPayload, 'base64').toString();
}) 

/* GET home page. */
app.get('/', function(req, res) {  
    res.render('../Views/homepage.ejs',{GlobalData: GlobalData});
});

// SOCKET
io.on("connection", function(socket)
{
  console.log("Client connected: " + socket.id);

  socket.on("disconnect", function() {
    console.log(socket.id + " disconnected");
  });

  socket.on("REQUEST_GET_DATA", function() {
    socket.emit("SEND_DATA", GlobalData);
  });

  function intervalFunc() {
    socket.emit("SEND_DATA", GlobalData);
  }
  setInterval(intervalFunc, 2000);
});
