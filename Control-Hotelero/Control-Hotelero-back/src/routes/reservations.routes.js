'use strict'

const express = require ('express');
const reservationController = require('../controllers/reservations.Controller')
const mdAuth = require ('../services/authenticated');

const api = express.Router();

api.post('/addReservation/:idHotel', [mdAuth.ensureAuth], reservationController.addReservation);
api.put('/updateDate/:idReservation', [mdAuth.ensureAuth], reservationController.updateDate)

module.exports = api;