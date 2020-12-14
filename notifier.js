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
  if (err.errorCode === -1) {
    client.publish(deviceRoot + '/log/error', `ERROR: ${err}`);
  }
  client.subscribe(`${deviceRoot}notifier`);
  console.log(' >> Notifier subscribed...');
});

client.on('message', (topic, payload) => {
  const err = sendMail(payload);
  if (err) {
    client.publish(deviceRoot + 'log/error', `ERROR: ${err}`);
  }
  const p = JSON.parse(payload);
  client.publish(deviceRoot + 'log/confirmation', `Confirmation booked for ${p.name}, sent email to ${p.emailaddress}`);
  console.log('sending mail!')
});