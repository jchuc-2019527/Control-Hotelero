'use strict'

const express = require('express');
const hotelController = require('../controllers/hotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();


api.post('/addHotel/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], hotelController.addHotel);


module.exports = api;

