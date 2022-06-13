'use strict'

const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    user:{type: mongoose.Schema.ObjectId, ref:'User'},
    fecha: Date,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'},
    serviceClient:{type: mongoose.Schema.ObjectId, ref:'ServiceClient'},
    reservations:{type: mongoose.Schema.ObjectId, ref:'Reservations'}
});

module.exports = mongoose.model('Invoice', invoiceSchema);