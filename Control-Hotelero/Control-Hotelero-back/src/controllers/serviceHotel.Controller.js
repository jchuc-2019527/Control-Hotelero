'use strict'
const Service = require('../models/serviceHotel.model');
const {validateData, checkPermission1, checkDataUpdate1} = require ('../utils/validate')


exports.addService = async(req, res)=>{
    try {
        const params = req.body;
        const hotelId = req.params.id;

        const data ={
            name: params.name,
            price: params.price,
            hotel: hotelId
        };
        const msg = await validateData(data);
        if(!msg){
            const searchService = await Service.findOne({name: params.name});
            if(!searchService){
                const service = new Service(data);
                await service.save();
                return res.status(200).send({message: 'Service created successfuly', service});
            }else{
                return res.status(400).send({message: 'This Service already exist'});
            }
        }else{
            return res.status(400).send(msg)
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};


exports.updateService =async(req,res)=>{
    try {
        const params = req.body;
        const serviceId = req.params.id;
        
        const serviceExist = await Service.findOne({_id: serviceId});
        if(serviceExist){
            const checkData = await checkDataUpdate1(params);
            if(checkData === true){
                const serviceName = await Service.findOne({name: params.name})
                if(serviceName && serviceExist.name != params.name){
                    return res.status(400).send({message:'Name already in use'})
                }else{
                    const serviceUpdate = await Service.findOneAndUpdate({_id: serviceId}, params, {new:true})
                    return res.status(200).send({message:'Service updated successfuly', serviceUpdate})
                }
            }else{
                return res.status(400).send({message:'Unable to update this data'});
            }
        }else{
            return res.status(400).send({message:'Serivice not found'})
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.deleteService = async(req,res)=>{
    try {
        const serviceId = req.params.id;

        const serviceExist = await Service.findOne({_id: serviceId});
        if(serviceExist){
            const serviceDelete = await Service.findOneAndDelete({_id: serviceId});
            return res.status(200).send({message:'Service deleted successfuly', serviceDelete});
            
        }else{
            return res.status(400).send({message:'Serivice not found'})
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostrar todos los servicios de un Hotel
exports.getServices = async(req, res)=>{
    try {
        const idHotel = req.params.idHotel;
        const events = await Service.find({hotel: idHotel});

        return res.status(200).send({events});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Mostar solo un servicio
exports.getService = async (req, res)=>{
    try {
        const idService = req.params.idService;
        const event = await Service.findOne({_id: idService})
        return res.status(200).send({event});

    } catch (error) {
        console.log(error);
        return error;
    }
};