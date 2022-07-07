'use strict'

const express = require('express');
const invoiceController = require ('../controllers/invoice.Controller')
const mdAuth = require('../services/authenticated');


const api = express.Router();

api.post('/generateInvoice/:idReservation', invoiceController.generateInvoice)
api.get('/getInvoices/:username',[mdAuth.ensureAuth],invoiceController.getInvoices )
module.exports = api;