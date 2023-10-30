'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: false },
  highScore: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
});

const UserSchema = mongoose.model('WR-user', userSchema);

module.exports = UserSchema;

