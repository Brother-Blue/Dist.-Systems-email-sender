const mqtt = require('mqtt');
const dotenv = require('dotenv');

const deviceRoot = 'root/';
const message = JSON.stringify({
  method: 'getAll'
});

dotenv.config();
const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT
});

client.on('connect', (err) => {
  if (err.errorCode === -1) return console.error(err);
  console.log(' >> Mock publisher connected...');
  client.publish(`${deviceRoot}appointment`, message);
})