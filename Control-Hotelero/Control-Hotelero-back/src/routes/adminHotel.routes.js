'use strict'

const express = require('express');
const adminHotelController = require('../controllers/adminHotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();


api.post('/createAdminHotel', [mdAuth.ensureAuth, mdAuth.isAdmin], adminHotelController.createAdminHotel);


module.exports = api;