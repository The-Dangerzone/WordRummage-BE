'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: false },
});

const UserSchema = mongoose.model('WR-user', userSchema);

module.exports = UserSchema;

