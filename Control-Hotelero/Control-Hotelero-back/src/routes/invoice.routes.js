'use strict'

const express = require('express');
const invoiceController = require ('../controllers/invoice.Controller')
const mdAuth = require('../services/authenticated');


const api = express.Router();

api.post('/generateInvoice/:idReservation', [mdAuth.ensureAuth1, mdAuth.isAdminHotel], invoiceController.generateInvoice)

module.exports = api;