'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    nameHotel: String,
    request: Number,
    direction: String,
    phone: String,
    email: String,
    adminHotel:{type: mongoose.Schema.ObjectId, ref:'AdminHotel'}
});

module.exports = mongoose.model('Hotel', hotelSchema);
