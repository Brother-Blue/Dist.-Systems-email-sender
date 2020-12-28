#  EmailSender

## EmailSender High-level description 

The EmailSender contains a subscriber, described as 'Notifier', which subscribes to a topic which provides the data to be included in the email, and location where the email should be sent. The 'Mailer' contains the functionality that sends out an email.

### Communication
All communication between the EmailSender and the rest of the system is done via a broker, using the MQTT-protocol applying a Publish/Subscribe architectural style. 

### How to run
1. Install MQTT-broker
    1. Download the Mosquitto MQTT-broker from [here](https://mosquitto.org/)
    1. Locate and open the Mosquitto configuration file (mosquitto.conf)
    1. Add "#Websockets  
            listener 9001  
            protocol websockets"
    1. Restart the broker
1. Move to the notifier folder
1. Run npm install in the terminal
1. Run node notifier.js in the terminal