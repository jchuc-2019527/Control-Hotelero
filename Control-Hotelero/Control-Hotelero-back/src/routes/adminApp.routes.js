'use strict'
const express = require('express');
const adminAppController = require('../controllers/adminApp.Controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();


api.post('/registerAdminApp', adminAppController.registerAdminApp);
api.get('/getUsers',[mdAuth.ensureAuth, mdAuth.isAdmin], adminAppController.getUsers);
api.get('/getAdminHotel',[mdAuth.ensureAuth, mdAuth.isAdmin], adminAppController.getAdminHotel);
api.get('/getUsersbyAdmin', [mdAuth.ensureAuth], adminAppController.getUsersbyAdmin);

api.put('/updateAdminApp/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], adminAppController.updateAdminApp);

module.exports = api;