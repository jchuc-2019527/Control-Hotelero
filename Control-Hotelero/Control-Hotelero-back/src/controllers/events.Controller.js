'use strict'

const {validateData,checkDataUpdate1,checkPermission1 } = require('../utils/validate');
const Events = require('../models/events.model');



//Agregar una Evento
exports.addEvent = async(req, res)=>{
    try {
        const params = req.body;
        const hotelId = req.params.id;

        const data = {
            name: params.name.toUpperCase(),
            type: params.type.toUpperCase(),
            hotel: hotelId
        }
        const msg = validateData(data);
        if(!msg){
            const eventExist = await Events.findOne({name: params.name.toUpperCase(), hotel:hotelId});
            if(!eventExist){
                let event = new Events(data);
                await event.save();
                return res.status(200).send({message:'Event created successfully', event});
            }else{
                return res.status(400).send({message:'Event already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};


//Update event
exports.updateEvent = async (req,res)=>{
    try {
        const params = req.body;
        const adminHotelId = req.adminHotel.sub;
        const eventId = req.params.id;

        const eventExist = await Events.findOne({_id: eventId});
        if(eventExist){
            const permission = await checkPermission1(adminHotelId, eventExist.adminHotel); ///
            if(permission === true){
                const checkData = await checkDataUpdate1(params);
                if(checkData === false){
                    return res.status(400).send({message:'Unable to update this data'});
                }else{
                    const eventExist = await Events.findOne({name:params.name.toUpperCase(), adminHotel: adminHotelId});
                    if(!eventExist){
                        const eventUpdate = await Events.findOneAndUpdate({_id: eventId}, {name: params.name.toUpperCase(), type: params.type}, {new:true});
                        return res.status(200).send({message: 'Event Updated', eventUpdate})
                    }else{
                        return res.status(400).send({message:'Event already exist'})
                    }
                }
            }else{
                return res.status(400).send({message:'Accion unauthorized'});
            }

        }else{
            return res.status(400).send({message:'Event not found'})
        }

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get de los  eventos

exports.getEvents = async (req, res)=>{
    try {
        const userId = req.user.sub
        const events = await Events.find({user: userId});
        return res.status(200).send({events});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get de un solo evento
exports.getEvent = async (req, res)=>{
    try {
        const eventId = req.params.id;
        const event = await Events.findOne({_id: eventId})
        return res.status(200).send({event});

    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get de los  eventos adminHotel

exports.getEventsadminHotel = async (req, res)=>{
    try {
        const adminHotelId = req.adminHotel.sub
        const events = await Events.find({adminHotel: adminHotelId});
        return res.status(200).send({events});

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Get de un solo evento adminHotel
exports.getEventadminHotel = async (req, res)=>{
    try {
        const eventId = req.params.id;
        const event = await Events.findOne({_id: eventId})
        return res.status(200).send({event});

    } catch (error) {
        console.log(error);
        return error;
    }
};


//Eliminar un evento
exports.deleteEvent = async(req, res)=>{
    try {
        const adminHotelId = req.adminHotel.sub;
        const eventId = req.params.id;

        const eventExist = await Events.findOne({_id: eventId});
        if(eventExist){
            const permission = await checkPermission1(adminHotelId, eventExist.adminHotel);
            if(permission === false){
                const deleteEvent = await Events.findOneAndDelete({_id: eventId});
                return res.status(200).send({message:'Event Deleted', deleteEvent});
            }else{
                return res.status(400).send({message:'Accion unauthorized'})
            }

        }else{
            return res.status(404).send({message:'Event not found'}) 
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

