'use strict'
const {validateData} = require ('../utils/validate');
const Reservation = require ('../models/reservations.model');
const Room = require ('../models/rooms.model')

//Agregar Reservación:

exports.addReservation4 = async(req, res)=>{
    try {
        const params = req.body;
        const userId = req.user.sub;
        const hotelId = req.params.idHotel

        

        const data = {
            user: userId,
            hotel: hotelId
        };

        const data2 ={
            fechaInicio: params.fechaInicio,
            fechaFinal: params.fechaFinal,
            room: params.room,
            service: params.service
        }

        const msg = await validateData(data);
        if(!msg){
            //Guardamos la reservación
            const saveReservation = await Reservation(data);
            saveReservation.save();

            //Pusheamos las habitaciones
            const searchRoom = await Room.findOne({_id: params.room})
            const reservationUpdate = await Reservation.findOneAndUpdate({_id: saveReservation._id},{
                $push:{
                    rooms:[
                        {
                            room:{idRoom: params.room, subTotal: (searchRoom.price) }
                        }
                    ]
                }
            },
            {new:true});

            //pusheamos los servicios
             const reservationUpdate2 = await Reservation.findOneAndUpdate({_id: saveReservation._id}, {
                $push:{
                    services: params.service
                }
            },
            {new: true});
            //Buscamos la reservación actual
            const reservation = await Reservation.findOne({_id: saveReservation._id }).lean();
            //Sumamos los tatales
            let arrayRoom = Object.entries(reservation.rooms);
            let totalRoom = 0;
            for(let i=0; i<arrayRoom.length; i++){
                totalRoom = totalRoom + reservation.rooms[i].room.subTotal;
            };

            let arrayService = Object.entries(reservation.services)
            let totalService =0;
            for(let i=0; i<arrayService.length; i++){
                totalService = totalService + reservation.services[i].price;
            };
            //Actualizamos el atributo Total
            const totalUpdate = await Reservation.findOneAndUpdate({_id: saveReservation._id}, {total: totalRoom + totalService}, {new:true}); 
            return res.send({message:'Reservation added successfuly', totalUpdate})


        }else{
            return res.status(400).send(msg)
        }


        
    } catch (error) {
        console.log(error);
        return error;
    }
}

//FUNCIÓN PARA CREAR UNA RESERVACIÓN CON SUS CAMPOS VACIOS
exports.addReservation = async (req, res) => {
    try {
        const idUser = req.user.sub;
        const idHotel = req.params.idHotel;
        const data = {
            startDate: "",
            finishDate: "",
            user: idUser,
            hotel: idHotel,
            services: [],
            total:0
        }
        let reservation = new Reservation(data);
        await reservation.save();
        return res.status(200).send({message: "Reservation created successfully"});
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA ACTUALIZAR LA FECHA DE UNA RESERVACION
exports.updateDate = async (req, res) => {
    try {
        const idReservation = req.params.idReservation;
        const params = req.body;
        const data = {
            startDate: new Date(params.startDate), 
            finishDate: new Date(params.finishDate)
        } 
        const msg = await validateData(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const reservationUpdated = await Reservation.findOneAndUpdate({_id: idReservation}, data, {new: true});
            return res.status(200).send({reservationUpdated, message: "Reservation updated."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.addRoom = async(req, res)=>{
    try {
        
        
    } catch (error) {
        console.log(error);
        return error;
    }
}