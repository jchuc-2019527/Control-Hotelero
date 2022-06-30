
'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate: Date,
    finishDate: Date,
    user: {type: mongoose.Schema.ObjectId, ref:'User'},
    hotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'},
    room: {type: mongoose.Schema.ObjectId, ref:'Rooms'},
    services: [{
        service: {
            idService: {type: mongoose.Schema.ObjectId, ref: "ServiceHotel"},
            name: String,
            price: Number
        }
    }],
    total: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);