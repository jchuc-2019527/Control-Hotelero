'use strict'

const mongoose = require('mongoose')

const serviceClientSchema = mongoose.Schema({

    serviceHotel: [
        {type: mongoose.Schema.ObjectId, ref: 'ServiceHotel'}
    ],
    user:{type: mongoose.Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('ServiceClient', serviceClientSchema);