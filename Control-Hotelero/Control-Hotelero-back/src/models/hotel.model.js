'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name: String,
    request: Number,
    direction: String,
    phone: String,
    adminHotel:{type: mongoose.Schema.ObjectId, ref:'AdminHotel'}
});

module.exports = mongoose.model('Hotel', hotelSchema);