const amqp = require('amqplib');
const axios = require('axios');

async function start(){
    try{
        const connection = await amqp.connect('amqp://localhost');
        const ch = await connection.createChannel();
        const queueName = 'incoming_message';

        await ch.assertQueue(queueName, {durable: false});

        console.log('Listening for messages ');

        ch.consume(queueName, async (message) => {
            const content = message.content.toString();
            
            setTimeout(() => {
                console.log('Received message:', content);
                ch.ack(message);
            },5000)

        await sendClientApp(content);

        }, {noAck: false});
    } catch (error){
        console.error('Error', error);
    }
}

async function sendClientApp(msg){
    try{
        await axios.post('http://localhost:8080/send-message', {msg});
        console.log('Message send to client_app successfully');
    } catch (err){
        console.error('Error sending mesage to client', err);
    }
}

start();


