'use strict'

const mongoose = require('mongoose')

const adminHotelSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('AdminHotel', adminHotelSchema);