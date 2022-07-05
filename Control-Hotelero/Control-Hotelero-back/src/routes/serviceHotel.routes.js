'use strict'
const express = require ('express');
const serviceController = require ('../controllers/serviceHotel.Controller');
const mdAuth = require ('../services/authenticated');

const api = express.Router();
api.post('/addService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.addService);
api.put('/updateService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.updateService);
api.delete('/deleteService/:id', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], serviceController.deleteService);


//Cliente y adminHotel
api.get('/getServices/:idHotel', serviceController.getServices);
api.get('/getService/:idService', [mdAuth.ensureAuth1], serviceController.getService)


module.exports = api;