'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
});

const UserSchema = mongoose.model('user', userSchema);

module.exports = UserSchema;

