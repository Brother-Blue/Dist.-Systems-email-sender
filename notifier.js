const mqtt = require('mqtt');
const dotenv = require('dotenv');
const { sendMail } = require('./mailer');

const deviceRoot = 'dentistimo/';

dotenv.config();
const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT
});

client.on('connect', (err) => {
  if (err.errorCode === -1) return console.error(err);
  client.subscribe(`${deviceRoot}notifier`);
  console.log(' >> Notifier subscribed...');
});

client.on('message', (topic, payload) => {
  sendMail(payload);
  console.log('sending mail!')
});