'use strict'

const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    dateInvoice: Date,
    startDate: Date,
    finishDate: Date,
    user: String,
    hotel: String,
    room: String,
    services: [{
        service: {
            idService: {type: mongoose.Schema.ObjectId, ref: "ServiceHotel"},
            name: String,
            price: Number
        }
    }],
    days: Number,
    total: Number
});

module.exports = mongoose.model('Invoice', invoiceSchema);