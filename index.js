const mqtt = require('mqtt')
var express = require('express'); 
let app = express();
app.use(express.urlencoded({extended:true}));

var url = require('url');

const host = 'eu1.cloud.thethings.network' 
const port = '1883' 

let getDataFromTTN;

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
client.on("message", function (topic, message, packet) {
    getDataFromTTN = JSON.parse(message);
    data = getDataFromTTN.uplink_message.decoded_payload;
    console.log("message is " + message);
    console.log("topic is " + topic);
}) 

/* GET home page. */
app.get('/', function(req, res, next) {  
    res.render('../Views/homepage.ejs',{getDataFromTTN: getDataFromTTN});
});

//setting middleware; css/img
app.use(express.static('public'));


app.listen(3000, function() {
    console.log("le serveur running on port 3000")
});
 