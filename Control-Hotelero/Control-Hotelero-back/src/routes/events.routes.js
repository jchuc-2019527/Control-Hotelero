'use strict'

const express = require('express');
const eventController = require('../controllers/events.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();

// adminHotel
api.post('/addEvent/:id',[mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.addEvent);
api.put('/updateEvent/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.updateEvent);
api.delete('/deleteEvent/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], eventController.deleteEvent);
api.get('/getEventsadminHotel', [mdAuth.ensureAuth1], eventController.getEventsadminHotel);
api.get('/getEventadminHotel/:id', [mdAuth.ensureAuth1], eventController.getEventadminHotel);

// users
api.get('/getEvents', [mdAuth.ensureAuth], eventController.getEvents);
api.get('/getEvent/:id', [mdAuth.ensureAuth], eventController.getEvent);



module.exports = api;