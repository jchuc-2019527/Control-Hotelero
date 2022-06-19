'use strict'

const express = require('express');
const hotelController = require('../controllers/hotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();

// users
api.get('/getHotels', [mdAuth.ensureAuth], hotelController.getHotels);
api.get('/getHotel/:id', [mdAuth.ensureAuth], hotelController.getHotel);

// adminHotel
api.get('/getHotelAdmin', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], hotelController.getHotelAdmin);
api.post('/addHotel', [mdAuth.ensureAuth, mdAuth.isAdmin], hotelController.addHotel);


module.exports = api;

