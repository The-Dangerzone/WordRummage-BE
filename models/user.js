'use strict';
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: false, unique: true },
  highScore: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
});

userSchema.plugin(beautifyUnique);

const User = mongoose.model('WR-user', userSchema);

module.exports = User;

