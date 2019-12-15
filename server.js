require('dotenv').config(); // Allow access to the .env configs.

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => console.log('MongoDB: Connected.'));
db.on('error', (error) => console.error('MongoDB: Error to connect.', error));

app.use(express.json()); // Allows the API to send the req/res body as json.
app.listen(3000, () => console.log('Server Started'));

const userRouter = require('./routes/user');
app.use('/user', userRouter);