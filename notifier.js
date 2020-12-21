const mqtt = require("mqtt");
const dotenv = require("dotenv");
const { sendMail } = require("./mailer");

const root = "dentistimo/";

dotenv.config();
const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
});

client.on("offline", () => {
  console.log("Offline");
  client.unsubscribe(`${root}notifier`);
});

client.on("close", () => {
  console.log("Close");
  client.unsubscribe(`${root}notifier`);
});

client.on("connect", (err) => {
  if (err.errorCode === -1) {
    client.publish(root + "/log/error", `ERROR: ${err}`, 2);
  }
  client.subscribe(`${root}notifier`);
  console.log(" >> Notifier subscribed...");
});

client.on("message", (topic, payload) => {
  const err = sendMail(payload);
  if (err) {
    client.publish(root + "log/error", `ERROR: ${err}`, 2);
  }
  const p = JSON.parse(payload);
  client.publish(
    root + "log/confirmation",
    `Confirmation booked for ${p.name}, sent email to ${p.emailaddress}`,
    1
  );
  console.log("sending mail!");
});
