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

//Mostrar todos las Habitaciones de un Hotel
exports.getRooms = async(req, res)=>{
    try {
        const idHotel = req.params.idHotel;
        const rooms = await Room.find({hotel: idHotel});

        return res.status(200).send({rooms});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostar solo una Habitación
exports.getRoom = async (req, res)=>{
    try {
        const idRoom = req.params.idRoom;
        const room = await Room.findOne({_id: idRoom})
        return res.status(200).send({room});

    } catch (error) {
        console.log(error);
        return error;
    }
};
