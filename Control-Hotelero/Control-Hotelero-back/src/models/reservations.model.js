'use strict'

const mongoose = require('mongoose')

const reservationsSchema = mongoose.Schema({
    user:{type: mongoose.Schema.ObjectId, ref:'User'},
    fechaInicio: Date,
    fechaFinal: Date,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    rooms: [
         {room: {
                idRoom: {type: mongoose.Schema.ObjectId, ref: 'Rooms'},
                services: [ {type: mongoose.Schema.ObjectId, ref: 'ServiceHotel'}],
                subTotal: Number
            }
        }

    ],
    Total: Number
});

module.exports = mongoose.model('Reservations', reservationsSchema);