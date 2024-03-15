const express = require('express');

const app = express();

app.use(express.json());

app.post('/send-message', (req, res) => {
    const message = req.body.message;
    console.log('Received message from RabbitMQ:', message);

    res.status(200).json({success: true, message: 'Successfully'});
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });


