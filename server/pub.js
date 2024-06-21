const mqtt = require('mqtt');

const readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Connect MQTT Broker
const options = {
    host: 'broker.emqx.io',
    port: 1883,
    username: 'emqx',
    password: 'public'
}
const client = mqtt.connect(options)
// Input Message
console.log('Enter message:');
rl.on('line', (input) => {
        client.publish(topic, input); // Gửi tin nhắn lên kênh 'chat'\
        console.log(`
          Topic: ${topic}
          Message: ${input.toString()}`);
        console.log('Enter message:');
    });
const topic = 'control'

  
client.on('connect', () => {
    // console.log('Connected Success!')
})

