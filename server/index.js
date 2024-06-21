const methodOverride = require('method-override')
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const mqtt = require('mqtt')
const port = 4000
const iotSchema = require('./models/Iot')
const ControlSchema = require('./models/Control')
const route = require('./routes')
const db = require('./config/db')
const moment = require('moment');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(morgan('combined'));
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

db.connect()

route(app);


const mqttClient = mqtt.connect('mqtt://broker.emqx.io:1883', {
    username: 'emqx',
    password: 'public',
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('iotDATA');
    mqttClient.subscribe('controlLed');
    mqttClient.subscribe('controlFan');
    // mqttClient.subscribe('controlLed2')
  });

mqttClient.on('message', async (topic, message) => {
    console.log(topic)
    console.log(message.toString())
    if (topic === 'iotDATA') {
        const data = JSON.parse(message.toString());
        const newIotData = await iotSchema.create({
            temperature: data.Temperature,
            humidity: data.Humidity,
            light: data.Light / 10,
            time: moment().format('HH:mm:ss'),
          });
          console.log(newIotData)
        }
      });
      
mqttClient.on('message', async (topic, message) => {
    console.log(topic)
    if (topic !== 'iotDATA') {
      const newData = await ControlSchema.create({
        time: moment().format('HH:mm:ss'),
        name: topic.includes('controlLed')  ? "LED" : "FAN",
        state: message.toString(),
        topic,
      });
      console.log(newData)
    }
  });