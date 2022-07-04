'use strict'

const express = require('express');
const eventController = require('../controllers/events.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();

// adminHotel
api.post('/addEvent/:id',[mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.addEvent);
api.put('/updateEvent/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.updateEvent);
api.delete('/deleteEvent/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.deleteEvent);

//Cliente y adminHotel
api.get('/getEvents/:idHotel', [mdAuth.ensureAuth], eventController.getEvents);
api.get('/getEvent/:idEvent', [mdAuth.ensureAuth], eventController.getEvent)


module.exports = api;