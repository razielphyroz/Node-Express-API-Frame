require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => console.log('MongoDB: Connected.'));
db.on('error', (error) => console.error('MongoDB: Error to connect.', error));

app.use(express.json());
app.listen(3000, () => console.log('Server Started'));

const crudRouter = require('./routes/crud');
app.use('/crud', crudRouter);