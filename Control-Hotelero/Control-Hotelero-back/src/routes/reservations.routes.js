'use strict'

const express = require ('express');
const reservationController = require('../controllers/reservations.Controller')
const mdAuth = require ('../services/authenticated');

const api = express.Router();

api.post('/addReservation/:idClient/:idHotel', reservationController.addReservation);
api.put('/updateRoom/:idReservation', [mdAuth.ensureAuth], reservationController.updateRoom);
api.put('/pushDate/:idReservation/:idRoom', [mdAuth.ensureAuth], reservationController.pushDate);
api.put('/pushServices/:idReservation', [mdAuth.ensureAuth], reservationController.pushServices);

api.put('/confirmateReservation/:idReservation', [mdAuth.ensureAuth], reservationController.confirmateReservation);
api.get('/getReservations', [mdAuth.ensureAuth], reservationController.getReservations);
api.put('/cancelReservation/:idReservation', [mdAuth.ensureAuth],reservationController.cancelReservation);

api.get('/getReservationsByHotel/:idHotel', [mdAuth.ensureAuth1], reservationController.getReservationsByHotel)
module.exports = api;