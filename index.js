const mqtt = require('mqtt')
var express = require('express');
var router = express.Router();
var url = require('url');

const host = '127.0.0.1' 
const port = '1883' 
 
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, { 
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})

client.on('connect', () => {
    var topic = "v3/ecam-dht11@ttn/devices/eui-70b3d57ed0055dbb/up";
    var topic = "'/nodejs/mqtt'"
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
    var getDataFromTTN = JSON.parse(message);
    data = getDataFromTTN.uplink_message.decoded_payload;
    console.log("message is " + message);
    console.log("topic is " + topic);
}) 

/* GET home page. */
router.get('/', function(req, res, next) {
    var config =  url.parse(connectUrl);
    config.topic = topic;
    res.render('../Views/homepage.ejs') 
});
 