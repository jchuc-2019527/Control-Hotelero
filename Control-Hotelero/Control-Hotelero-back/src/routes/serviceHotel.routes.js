'use strict'
const express = require ('express');
const serviceController = require ('../controllers/serviceHotel.Controller');
const mdAuth = require ('../services/authenticated');

const api = express.Router();
api.post('/addService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.addService);
api.put('/updateService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.updateService);
api.delete('/deleteService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.deleteService);
api.get('/getServicesAdminHotel', [mdAuth.ensureAuth1], serviceController.getServicesAdminHotel);
api.get('/getServiceAdminHotel/:id', [mdAuth.ensureAuth1], serviceController.getServiceAdminHotel);

// users
api.get('/getServices', [mdAuth.ensureAuth], serviceController.getServices);
api.get('/getService/:id', [mdAuth.ensureAuth], serviceController.getService);


module.exports = api;