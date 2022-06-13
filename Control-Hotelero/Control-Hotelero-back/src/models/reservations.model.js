'use strict'

const mongoose = require('mongoose')

const reservationsSchema = mongoose.Schema({
    user:{type: mongoose.Schema.ObjectId, ref:'User'},
    fechaInicio: Date,
    fechaFinal: Date,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    rooms: [
        {type: mongoose.Schema.ObjectId, ref: 'Rooms'}
    ],
    price: Number
});

module.exports = mongoose.model('Reservations', reservationsSchema);