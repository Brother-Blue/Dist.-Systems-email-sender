#  EmailSender

## EmailSender High-level description 

The EmailSender contains a subscriber, described as 'Notifier', which subscribes to a topic which provides the data to be included in the email, and location where the email should be sent. The 'Mailer' contains the functionality that sends out an email.

### Communication
All communication between the EmailSender and the rest of the system is done via a broker, using the MQTT-protocol applying a Publish/Subscribe architectural style. 

### How to run

1. Move to the notifier folder

1. Run npm install in the terminal

1. Run node notifier.js in the terminal