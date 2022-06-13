'use strict'

const mongoose = require('mongoose')

const roomsSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    status: Boolean
});

module.exports = mongoose.model('Rooms', roomsSchema);