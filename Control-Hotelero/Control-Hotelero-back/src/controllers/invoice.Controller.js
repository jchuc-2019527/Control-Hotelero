'use strict'
const Invoice = require ('../models/invoice.model')
const Reservation = require ('../models/reservations.model')

exports.generateInvoice = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation}).populate('user').populate('hotel').populate('room');
        const data = {
            dateInvoice: new Date(),
            startDate: reservation.startDate,
            finishDate: reservation.finishDate,
            user: reservation.user.username,
            hotel: reservation.hotel.nameHotel,
            room: reservation.room.name,
            services: reservation.services,
            total: reservation.total,
            days: reservation.days
        }
        let invoice = new Invoice(data);
        await invoice.save();
        const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {status: true}, {new: true});
        return res.status(200).send({message:'Invoice generated', invoice});
    } catch (err) {
        console.log(err);
        return err;
    }
};


//Mostrarme las facturas de un Cliente
exports.getInvoices  = async(req, res)=>{
    try {
        const params = req.body;
        
        const username= req.params.username
        
        const invoices = await Invoice.find({user: username});
        return res.status(200).send({invoices})
        
    } catch (error) {
        console.log(err);
        return err;
    }
}