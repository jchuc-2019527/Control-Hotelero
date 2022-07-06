'use strict'

const express = require('express');
const hotelController = require('../controllers/hotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();
//Admin-App
api.post('/addHotel', [mdAuth.ensureAuth, mdAuth.isAdmin], hotelController.addHotel);
api.delete('/deleteHotel/:idHotel', [mdAuth.ensureAuth, mdAuth.isAdmin], hotelController.deleteHotel);

//Admin -App y Admin-Hotel
api.put('/updateHotel/:idHotel', [mdAuth.ensureAuth], hotelController.updateHotel);
//Clientes
api.get('/getHoteles', hotelController.getHoteles);
api.get('/getHotel/:idHotel', mdAuth.ensureAuth, hotelController.getHotel);

//Admin-Hotel
api.get('/getHotelByAdmin', [mdAuth.ensureAuth1], hotelController.getHotelByAdmin)

module.exports = api;