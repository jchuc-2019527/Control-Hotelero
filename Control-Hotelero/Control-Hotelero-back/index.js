'use strict'

const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');

mongoConfig.init();
app.initServer();