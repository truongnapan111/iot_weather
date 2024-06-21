const mqtt = require('mqtt');
const options = {
  host: 'broker.emqx.io',
  port: 1883,
  username: 'emqx',
  password: 'public'

}

const client = mqtt.connect(options)

const topic = 'iotData'
  
client.on('connect', () => {
    console.log('Connected Success!')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic: ${topic}`)
    })
})

client.on('message', (topic, payload) => {
    console.log(`   
      Topic: ${topic}
      Message: ${payload.toString()}`)
})
