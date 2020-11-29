const mqtt = require('mqtt');
const dotenv = require('dotenv');

dotenv.config();

const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT
});