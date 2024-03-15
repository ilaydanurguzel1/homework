"use strict";
const dbConnection = require("./helper/postgresql");

async function saveToDB(msg){
  try{
    const client = await dbConnection.connect();
    const query = 'INSERT INTO messages (content) VALUES ($1)';
    const values = [msg];
    await client.query(query, values);
    client.release();
    console.log('Message saved to db');
  } catch (err){
    console.error('Error saving message to db', err);
  }
}

app.post('/send-message', async (req, res) => {
  const message = req.body.message;
  console.log('Received message from RabbitMQ:', message);

  await saveToDB(message);

  res.status(200).json({success: true, message: 'Successfully'});
});