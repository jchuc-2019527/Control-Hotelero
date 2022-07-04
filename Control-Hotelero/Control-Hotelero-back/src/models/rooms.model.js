'use strict'

const mongoose = require('mongoose')

const roomsSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    dates: [{
        date: {
            startDate: Date,
            finishDate: Date
        }
    }],
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    status: Boolean
});

module.exports = mongoose.model('Rooms', roomsSchema);