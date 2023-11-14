'use strict';
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: false, unique: true },
  normalMode: {
    highScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    highestRound: { type: Number, default: 0 },
    wordsFound: { type: Number, default: 0 },
    wordsMissed: { type: Number, default: 0 },
    accuracy: {
      correct: { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
  },
  insaneMode: {
    highScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    highestRound: { type: Number, default: 0 },
    wordsFound: { type: Number, default: 0 },
    wordsMissed: { type: Number, default: 0 },
    accuracy: {
      correct: { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
  },
  customMode: {
    highScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    highestRound: { type: Number, default: 0 },
    wordsFound: { type: Number, default: 0 },
    wordsMissed: { type: Number, default: 0 },
    accuracy: {
      correct: { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
  },
  nameCheck: { type: String, required: false },
});

userSchema.plugin(beautifyUnique);

const User = mongoose.model('WR-user', userSchema);

module.exports = User;

