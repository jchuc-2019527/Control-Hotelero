'use strict'

const express = require('express');
const userController = require('../controllers/user.Controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();


api.post('/registerUser', userController.registerUser);
api.post('/login', userController.login);
api.put('/updateUser/:id', mdAuth.ensureAuth, userController.updateUser);
api.delete('/deleteUser/:id', mdAuth.ensureAuth, userController.deleteUser);

module.exports = api;