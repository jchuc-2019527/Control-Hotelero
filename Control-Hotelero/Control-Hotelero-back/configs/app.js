'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 3200 || process.env.PORT;
const userRoutes = require('../src/routes/user.routes');
const adminAppRoutes = require('../src/routes/adminApp.routes');
const adminHotelRoutes = require('../src/routes/adminHotel.routes');
const hotelRoutes = require('../src/routes/hotel.routes');
const eventRoutes = require('../src/routes/events.routes');
const roomRoutes = require('../src/routes/rooms.routes');
const serviceRoutes = require('../src/routes/serviceHotel.routes');
const reservationRoutes = require('../src/routes/reservations.routes');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/user', userRoutes);
app.use('/adminApp', adminAppRoutes);
app.use('/adminHotel', adminHotelRoutes);
app.use('/hotel', hotelRoutes);
app.use('/event', eventRoutes);
app.use('/room', roomRoutes);
app.use('/service', serviceRoutes);
app.use('/reservation', reservationRoutes)

exports.initServer = ()=> app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});