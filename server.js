'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
// this will be the mongo connection once we get a DB_URL

// mongoose.connect(process.env.DB_URL);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

app.get('/', (request, response) => {
    response.send('Home Page!');
});

app.get('*', (request, response) => {
    response.status(404).send('Page not found');
});

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

module.exports = app;