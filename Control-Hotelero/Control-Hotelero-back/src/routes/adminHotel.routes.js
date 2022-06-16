'use strict'

const express = require('express');
const adminHotelController = require('../controllers/adminHotel.Controller');
const mdAuth = require('../services/authenticated');


const api = express.Router();



module.exports = api;