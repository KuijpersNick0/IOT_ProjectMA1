const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clean: true,
    connectTimeout: 4000,
    username: 'ecam-dht11@ttn',
    password: 'xxxxxx',
    reconnectPeriod: 1000,
})

client.on('connect', () => {
    var topic = "v3/ecam-dht11@ttn/devices/eui-70b3d57ed0055dbb/up";
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
