'use strict'
const AdminHotel = require ('../models/adminHotel.model')
const Hotel = require('../models/hotel.model');
const Service = require ('../models/serviceHotel.model');
const Room = require ('../models/rooms.model');
const Event = require ('../models/events.model')
const Reservation = require('../models/reservations.model');


const {validateData, encrypt} = require('../utils/validate');


//ADMIN-APP crea un hotel y el admin del Hotel
exports.addHotel = async(req, res)=>{
    try {
        const params = req.body;
        const dataManager ={
            name: params.name,
            username: params.username,
            password: params.password,
            role: 'ADMIN-HOTEL'
        }
        const dataHotel = {
            nameHotel: params.nameHotel.toUpperCase(),
            request: 0,
            direction: params.direction.toUpperCase(),
            phone: params.phone,
            email: params.email
        }
        const msgManager = validateData(dataManager)
        const msgHotel = validateData(dataHotel);

        if(msgManager || msgHotel){
            return res.status(400).send(`${msgManager} \n ${msgHotel}`);
        }else{
            const searchManager = await AdminHotel.findOne({username: params.username});
            if(searchManager){
                return res.status(400).send({message: 'This username of ADMIN-HOTEL already exist.'})
            }else{
                dataManager.password = await encrypt(params.password);
                let adminHotel = new AdminHotel(dataManager);
                await adminHotel.save();
                //adminHotel.password = undefined;
                //
                const searchHotel = await Hotel.findOne({nameHotel: params.nameHotel})
                if(searchHotel){
                    return res.status(400).send({message: 'This name of Hotel already exist'})
                }else{    
                    dataHotel.adminHotel = adminHotel._id
                    let hotel = new Hotel(dataHotel);
                    await hotel.save();
                    return res.status(200).send({message: 'Hotel and Admin created successfully', hotel, adminHotel});
                }
            }
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Eliminar un Hotel
exports.deleteHotel = async (req,res)=>{
    try {
        const idHotel = req.params.idHotel
        const hotelExist = await Hotel.findOne({_id: idHotel});
        if(hotelExist){
            const deleteAdminHotel = await AdminHotel.findOneAndDelete({_id: hotelExist.adminHotel});
            const deleteReservation = await Reservation.deleteMany({hotel: idHotel});
            const deleteRoom = await Room.deleteMany({hotel: idHotel});
            const deleteService = await Service.deleteMany({hotel: idHotel});
            const deleteEvent = await Event.deleteMany({hotel: idHotel});
            const deleteHotel = await Hotel.findOneAndDelete({_id: idHotel});
            return res.status(200).send({message:'Hotel Deleted', deleteHotel})
        }else{
            return res.status(400).send({message:'Hotel not found'})
        }

    } catch (error) {
        console.log(error);
        return error;
    }
};


exports.updateHotel = async(req, res)=>{
    try {
        const idHotel = req.params.idHotel
        const params = req.body;
        const hotelExist = await Hotel.findOne({_id: idHotel});
        if(hotelExist){
            const hotelName = await Hotel.findOne({name: params.nameHotel})
            if(hotelName && hotelExist.nameHotel == params.nameHotel){
                return res.status(400).send({message:'Name already in use'})
            }else{
                const updateHotel = await Hotel.findOneAndUpdate({_id: idHotel}, params, {new:true})
                return res.status(200).send({message:'Hotel updated', updateHotel})
            }
        }else{
            return res.status(400).send({message:'Hotel not found'})
        }

    } catch (error) {
        console.log(error);
        return error;
    }
 };


//Mostrar todos los Hoteles
exports.getHoteles = async(req, res)=>{
    try {

        const hoteles = await Hotel.find();
        return res.status(200).send({hoteles});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostrar solo un Hotel
exports.getHotel = async (req, res)=>{
    try {
        const idHotel = req.params.idHotel;
        const hotel = await Hotel.findOne({_id: idHotel})
        return res.status(200).send({hotel});
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostrar el hotel del Admin-Hotel
exports.getHotelByAdmin = async (req, res)=>{
    try {
        const idAdmin = req.adminHotel.sub
        const hotel = await Hotel.findOne({adminHotel: idAdmin})
        const hotelId = hotel._id
        return res.status(200).send({hotelId});
    } catch (error) {
        console.log(error);
        return error;
    }
};


