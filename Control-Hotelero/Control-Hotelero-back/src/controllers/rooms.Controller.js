'use strict'
const Room = require('../models/rooms.model');
const {validateData, checkPermission1, checkDataUpdate1,} = require ('../utils/validate')


//Agregar Una habitación
exports.addRoom = async(req, res)=>{
    try {
        const params = req.body;
        const hotelId = req.params.id;

        const data  ={
            name: params.name,
            type: params.type,
            price: params.price,
            status: false,
            hotel: hotelId
        }
        const msg = await validateData(data);
        if(!msg){
            const searchRoom = await Room.findOne({name: params.name});
            if(!searchRoom){
                let room = new Room(data);
                await room.save();
                return res.status(200).send({message: 'Room created successfuly', room});
            }else{
                return res.status(400).send({message: 'This Room already exist'});
            }
        }else{
            return res.status(400).send(msg)
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}
//update room
exports.updateRoom = async(req, res)=>{
    try {
        const params = req.body;
        const roomId = req.params.id;
    

        const roomExist = await Room.findOne({_id: roomId})
        
        if(roomExist){
            const checkData = await checkDataUpdate1(params);
            if(checkData === false){
                return res.status(400).send({message:'Unable to update this data'});
            }else{
                 const existRoom = await Room.findOne({name:params.name.toUpperCase()})
                //Verificar
                if(existRoom && roomExist.name != params.name){ 
                    return res.status(400).send({message:'Name already in use'});
                }else{
                    const roomUpdate = await Room.findOneAndUpdate({_id: roomId}, params, {new:true});
                    return res.status(200).send({message:'Room updated succesfuly', roomUpdate});
                }
            }
            
        }else{
            return res.status(400).send({message:'Room not found'})
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Eliminar Room
exports.deleteRoom = async(req, res)=>{
    try {
        const roomId = req.params.id;

        const roomExist = await Room.findOne({_id: roomId});
        if(roomExist){
            const roomDelete = await Room.findOneAndDelete({_id: roomId});
            return res.status(200).send({message:'Room deleted successfuly', roomDelete});
            
        }else{
            return res.status(400).send({message:'Room not found'})
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get rooms, user
exports.getRooms = async (req, res)=>{
    try {
        const userId = req.user.sub
        const rooms = await Room.find({user: userId});
        return res.status(200).send({rooms});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get room, user
exports.getRoom = async (req, res)=>{
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({_id: roomId})
        return res.status(200).send({room});

    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get rooms, adminHotel

exports.getRoomsAdminHotel = async (req, res)=>{
    try {
        const adminHotelId = req.adminHotel.sub
        const rooms = await Room.find({adminHotel: adminHotelId});
        return res.status(200).send({rooms});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get room, adminHotel
exports.getRoomAdminHotel = async (req, res)=>{
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({_id: roomId})
        return res.status(200).send({room});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Ver habitaciones por hotel
exports.getRoomsUser = async(req, res)=>{
    try {
        const hotelId = req.params.id;
        const rooms = await Room.find({hotel: hotelId}).populate('hotel');

        return res.status(200).send({rooms});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Buscar habitaciones que esten disponibles, adminHotel
exports.getAviableRooms = async(req, res)=>{
    try{
        const hotelId = req.params.id;
        const rooms = await Room.find({hotel: hotelId, status: false})
        return res.send({rooms});

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error searching aviable rooms'});
    }
}