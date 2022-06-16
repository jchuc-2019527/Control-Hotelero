'use strict'
const AdminHotel = require('../models/adminHotel.model');
const Hotel = require('../models/hotel.model');
const {validateData} = require('../utils/validate');


//ADMIN-APP crea un hotel
exports.addHotel = async(req, res)=>{
    try {
        const params = req.body;
        const adminHotelId = req.params.id

        const data = {
            name: params.name.toUpperCase(),
            request: 0,
            direction: params.direction.toUpperCase(),
            phone: params.phone,
            adminHotel: adminHotelId
        }
        const msg = validateData(data);
        if(!msg){
            const HotelExist = await Hotel.findOne({name: params.name, adminHotel:adminHotelId});
            if(!HotelExist){
                let hotel = new Hotel(data);
                await hotel.save();
                return res.status(200).send({message:'Hotel created successfully', hotel});
            }else{
                return res.status(400).send({message:'Hotel already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

