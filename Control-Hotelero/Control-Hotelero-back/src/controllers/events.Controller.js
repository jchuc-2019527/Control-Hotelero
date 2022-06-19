'use strict'

const {validateData, checkDataUpdate1} = require('../utils/validate');
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
exports.updateEvent = async(req, res)=>{
    try {
        const params = req.body;
        const eventId = req.params.id;

        const eventExist = await Events.findOne({_id: eventId})
        
        if(eventExist){
            const checkData = await checkDataUpdate1(params);
            if(checkData === false){
                return res.status(400).send({message:'Unable to update this data'});
            }else{
                 const existEvent = await Events.findOne({name:params.name.toUpperCase()})
                //Verificar
                if(existEvent && eventExist.name != params.name){ 
                    return res.status(400).send({message:'Name already in use'});
                }else{
                    const eventUpdate = await Events.findOneAndUpdate({_id: eventId}, params, {new:true});
                    return res.status(200).send({message:'Event updated succesfuly', eventUpdate});
                }
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
        const eventId = req.params.id;

        const eventExist = await Events.findOne({_id: eventId});
        if(eventExist){
            const eventDelete = await Events.findOneAndDelete({_id: eventId});
            return res.status(200).send({message:'Event deleted successfuly', eventDelete});
        }else{
            return res.status(400).send({message:'Event not found'})
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Ver eventos de un hotel
exports.getEventsHotel = async(req, res)=>{
    try {
        const hotelId = req.params.id;
        const events = await Events.find({hotel: hotelId}).populate('hotel');

        return res.status(200).send({events});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

