'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const verifyUser = require('./auth.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
// this will be the mongo connection once we get a DB_URL

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// app.use(verifyUser);
app.post('/user', verifyUser, postUser);
app.put('/user/:id', putUser);

app.get('/', (request, response) => {
  response.send('Home Page!');
});

async function putUser(request, response, next) {
  try {
    let id = request.params.id;
    let data = request.body;
    let options = { new: true };
    let nameCheck = data.displayName.toLowerCase();
    const foundUser = await User.find({ nameCheck });
    if(foundUser.length){
      //return error and make them choose another name
      console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      response.status(420).send('duplicate displayname');
    } else {
      const updateUser = await User.findByIdAndUpdate(id, data, options);

      response.status(200).send(updateUser);
    }
  } catch (error) {
    next(error);
  }
}

async function postUser(request, response, next) {
  try {
    let email = request.user.email;
    const foundUser = await User.find({ email });

    console.log(foundUser);
    if (foundUser.length) {
      response.status(200).send(foundUser[0]);
    } else {
      let createdUser = await User.create({ ...request.body, email: request.user.email });
      response.status(200).send(createdUser);
    }
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Page not found');
});

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

module.exports = app;