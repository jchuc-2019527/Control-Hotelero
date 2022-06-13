'use strict'

const mongoose = require('mongoose')

const adminAppSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('AdminApp', adminAppSchema);