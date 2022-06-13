'use strict'

const mongoose = require('mongoose')

const eventsSchema = mongoose.Schema({
    name: String,
    type: String,
    hotel:{type: mongoose.Schema.ObjectId, ref:'Hotel'}
});

module.exports = mongoose.model('Events', eventsSchema);