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
app.put('/user/:id', updateDisplayName);
app.put('/stats/:id', updateUserStats);
app.get('/leaderboard', getLeaderboard);
app.delete('/delete/:id', deleteUser)

app.get('/', (request, response) => {
  response.send('Home Page!');
});

async function deleteUser(request, response, next) {
  try {
    let id = request.params.id;
    await User.findByIdAndDelete(id);
    response.status(200);
  } catch (error) {
    console.log(error);
  }
}

async function getLeaderboard(request, response, next) {
  try {
    let data = {};
    // limit will set how many users are returned
    data.normalLeaderboard = await User.find().sort({ "normalMode.highScore" :-1}).limit(10);
    data.insaneLeaderboard = await User.find().sort({ "insaneMode.highScore" :-1}).limit(10);
    response.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}

async function updateDisplayName(request, response, next) {
  try {
    let id = request.params.id;
    let data = request.body;
    let options = { new: true };
    let nameCheck = data.displayName.toLowerCase();
    const foundUser = await User.find({ nameCheck });
    if (foundUser.length) {
      //return error and make them choose another name
      response.status(420).send('duplicate displayname');
    } else {
      const updateUser = await User.findByIdAndUpdate(id, data, options);

      response.status(200).send(updateUser);
    }
  } catch (error) {
    next(error);
  }
}

async function updateUserStats(request, response, next) {
  try {
    let id = request.params.id;
    let data = request.body;
    let options = { new: true };
    // update accuracy percentage
    data.normalMode.accuracy.percentage = (Math.floor((data.normalMode.accuracy.correct / (data.normalMode.accuracy.correct + data.normalMode.accuracy.incorrect)) * 100) || 0);

    data.insaneMode.accuracy.percentage = (Math.floor((data.insaneMode.accuracy.correct / (data.insaneMode.accuracy.correct + data.insaneMode.accuracy.incorrect)) * 100) || 0);

    console.log(">>>>>>>>>>>>>>>>", data);

    const updateUser = await User.findByIdAndUpdate(id, data, options);

    response.status(200).send(updateUser);

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