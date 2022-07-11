'use strict'
const {validateData, getRange} = require ('../utils/validate');
const Reservation = require ('../models/reservations.model');
const Room = require ('../models/rooms.model');
const Service = require ('../models/serviceHotel.model');
const Hotel = require ('../models/hotel.model')


//Creación de Reservación (Hotel y Usuario)
exports.addReservation = async (req, res) => {
    try {
        const idUser = req.params.idClient;
        const idHotel = req.params.idHotel;
        const data = {
            startDate: "",
            finishDate: "",
            user: idUser,
            hotel: idHotel,
            services: [],
            status: false,
            total:0
        }
        let reservation = new Reservation(data);
        await reservation.save();
        //Actualizar request Hotel
        const hotel = await Hotel.findOne({_id: idHotel});
        const updateHotel = await Hotel.findByIdAndUpdate({_id: idHotel}, {request: hotel.request + 1}, {new:true});
        return res.status(200).send({message: "Reservation created successfully", reservation});
    } catch (err) {
        console.log(err); 
        return err;
    }
}

//Agregarle una habitación a las reservación
exports.pushRoom = async (req, res) => { 
    try {
        const idReservation = req.params.idReservation;
        const params = req.body;
        const data = {
            room: params.room
        } ;
        const msg = await validateData(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, data, {new: true});
            return res.status(200).send({ message: "Added Room", reservationUpdated});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

//Asignar la Fecha de reservación de la habitación
exports.pushDate = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const idRoom = req.params.idRoom;
        const params = req.body;
        const data = {
            startDate: params.startDate,
            finishDate: params.finishDate
        }
        const msg = await validateData(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            var startDate = new Date(data.startDate);
            var finishDate = new Date(data.finishDate);
            const room = await Room.findOne({_id: idRoom});
            //Aquí se almacena el arreglo de fechas de la habitacion encontrada
            const arrayDates = Object.values(room.dates)
            //Aqui se realiza la reservacion sin búsqueda ya que no hay ninguna fecha en el arreglo 
            if(arrayDates.length === 0){
                const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {
                    $push: {
                        dates: [{
                            date:{
                                startDate: startDate,
                                finishDate: finishDate
                            }
                        }]
                    }
                }, {new: true});
                const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {startDate: startDate, finishDate: finishDate}, {new: true});
                return res.status(200).send({message: "Added Dates"});
            }
            //Aqui se realiza la reservacion con búsqueda ya que ya hay fechas y se necesita comparar.  
            else{
                var arrayResults = [];
                arrayDates.forEach((item) => {
                    //ESTOS VIENEN DE LA DB
                    var start = item.date.startDate;
                    var final = item.date.finishDate;
                    //Verifico los rangos de fechas
                    let rangoFechasInicio = getRange(start, final, startDate);   
                    let rangoFechasFinal = getRange(start, final, finishDate);     
                    //ARRAY que almacena el resultado de cada vuelta
                    arrayResults.push(rangoFechasInicio);
                    arrayResults.push(rangoFechasFinal); 
                });
                console.log(arrayResults);
                if(arrayResults.includes(true)){
                    return res.status(400).send({message: "Dates not available"});
                }else{
                    const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {
                        $push: {
                            dates: [{
                                date:{
                                    startDate: startDate,
                                    finishDate: finishDate
                                }
                            }]
                        }
                    }, {new: true});
                    const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {startDate: startDate, finishDate: finishDate}, {new: true});
                    return res.status(200).send({message: "Added Dates"});
                }
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

//Pusheamos los servicios a la reservación
exports.pushServices = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const params = req.body;
        const data = {
            service: params.service
        }
        const msg = await validateData(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const service = await Service.findOne({_id: data.service});
            const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {
                $push: {
                    services: [{
                        service: {
                            idService: service._id,
                            name: service.name,
                            price: service.price
                        }
                    }]
                }
            }, {new: true});
            return res.status(200).send({message: "Service added", reservationUpdated});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

//Finalizar el proceso de la reservación (Se actualiza el total de dias y el Total a pagar)
exports.confirmateReservation = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation});
        //Calculamos el número de días que se estará en el hotel
        let date1 = reservation.startDate;
        let date2 = reservation.finishDate;
        let difference = Math.abs(date2-date1);

        //DIAS
        let days = difference/(1000 * 3600 * 24);
        
        //PRICE
        const room = await Room.findOne({_id: reservation.room});
        let priceRoom = room.price;

        //SE CALCULA EL HOSPEDAJE
        let totalHospedaje = days*priceRoom;

        //ARREGLO DE SERVICIOS
        const arrayService = Object.values(reservation.services);
        
        //Total de servicios
        let totalServices = 0;
        arrayService.forEach((item) => {
            totalServices += item.service.price;
        });
        
        const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, {total: totalHospedaje+totalServices, days: days}, {new: true});
        return res.status(200).send({message: "Reservation added.", reservationUpdated});
    } catch (err) {
        console.log(err);
        return err;
    }
};
 //Cancelar una Reservación
exports.cancelReservation = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const reservation = await Reservation.findOne({_id: idReservation});
        const idRoom = reservation.room;
        const room = await Room.findOne({_id: idRoom});
        const arrayDates = Object.values(room.dates);
        arrayDates.forEach((item) => {
            //ESTOS VIENEN DE LA DB
            var start = item.date.startDate;
            var final = item.date.finishDate;
            if(start.getTime() == reservation.startDate.getTime() && final.getTime() == reservation.finishDate.getTime()){
                console.log(arrayDates);
                console.log(arrayDates.indexOf(item));
                arrayDates.splice(arrayDates.indexOf(item), 1);
            }
        });
        const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {dates: arrayDates}, {new: true});
        const reservationDeleted = await Reservation.findOneAndDelete({_id: idReservation});
        return res.status(200).send({message: "Reservation canceled successfuly"});
        
    } catch (err) {
        console.log(err);
        return err;
    }
}



//FUNCION PARA OBTENER TODAS LAS RESERVACION QUE HA HECHO UN CLIENTE
exports.getReservations = async (req, res) => {
    try {
        const idClient = req.user.sub;
        const reservations = await Reservation.find({user: idClient}).populate('user').populate('hotel').populate('room');
        return res.status(200).send({reservations});
    } catch (err) {  
        console.log(err);
        return err;
    }
};


//FUNCION PARA OBTENER TODAS LAS RESERVACIONES QUE TIENE UN HOTEL
exports.getReservationsByHotel = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const reservations = await Reservation.find({hotel: idHotel, status: 'false'}).populate('user').populate('hotel').populate('room');
        return res.status(200).send({reservations});
    } catch (err) {
        console.log(err); 
        return err;   
    }
}