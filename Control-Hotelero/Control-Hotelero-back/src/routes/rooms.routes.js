'use strict'
const express = require ('express');
const roomController = require ('../controllers/rooms.Controller');
const mdAuth = require ('../services/authenticated');

const api = express.Router();

api.post('/addRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.addRoom);
api.put('/updateRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.updateRoom);
api.delete('/deleteRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.deleteRoom);
api.get('/getRoomsAdminHotel', [mdAuth.ensureAuth1], roomController.getRoomsAdminHotel);
api.get('/getRoomAdminHotel/:id', [mdAuth.ensureAuth1], roomController.getRoomAdminHotel);

// users
api.get('/getRooms', [mdAuth.ensureAuth], roomController.getRooms);
api.get('/getRoom/:id', [mdAuth.ensureAuth], roomController.getRoom);


module.exports = api;