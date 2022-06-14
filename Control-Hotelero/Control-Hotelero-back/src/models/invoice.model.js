'use strict'

const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    user:{type: mongoose.Schema.ObjectId, ref:'User'},
    fecha: Date,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    reservations:{type: mongoose.Schema.ObjectId, ref:'Reservations'},
    Total: Number
});

module.exports = mongoose.model('Invoice', invoiceSchema);