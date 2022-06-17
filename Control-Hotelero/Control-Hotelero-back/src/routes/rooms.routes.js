'use strict'
const express = require ('express');
const roomController = require ('../controllers/rooms.Controller');
const mdAuth = require ('../services/authenticated');

const api = express.Router();

api.post('/addRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.addRoom);
api.put('/updateRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.updateRoom);
api.delete('/deleteRoom/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], roomController.deleteRoom);


module.exports = api;