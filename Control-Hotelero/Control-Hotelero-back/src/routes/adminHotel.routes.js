'use strict'

const express = require('express');
const adminHotelController = require('../controllers/adminHotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();
api.put('/updateAdminHotel/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], adminHotelController.updateAdminHotel);
api.get('/getClientes/:idAdminHotel', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], adminHotelController.getClientes);

module.exports = api;