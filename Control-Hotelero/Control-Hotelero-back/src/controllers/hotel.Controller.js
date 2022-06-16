'use strict'
const AdminHotel = require ('../models/adminHotel.model')
const Hotel = require('../models/hotel.model');
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

