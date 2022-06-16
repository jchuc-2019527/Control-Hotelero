'use strict'
const AdminApp = require('../models/adminApp.model')
const {validateData, encrypt, searchAdminApp} = require('../utils/validate');
const User = require('../models/user.model');
const AdminHotel = require('../models/adminHotel.model');


//Register AdminAPP
exports.registerAdminApp = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: 'ADMIN-APP'
        }

        let msg = validateData(data);
        if(!msg){
            const adminAppExist = await searchAdminApp(params.username);
            if(!adminAppExist){
                data.password= await encrypt(params.password);

                let adminApp = new AdminApp(data);
                await adminApp.save();
                adminApp.password = undefined;
                return res.status(200).send({message:'Admin saved', adminApp});

            }else{
                return res.status(400).send({message:'This username already exist'})
            }

        }else{
            return res.status(400).send(msg)
        }

    } catch (error) {
        console.log(error);
        return error;
        
    }
};

exports.getUsers = async (req, res)=>{
    try {
        const users = await User.find({role:'CLIENT'});
        return res.status(200).send({users});
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getAdminHotel = async (req, res)=>{
    try {
        const adminHotel = await AdminHotel.find({role:'ADMIN-HOTEL'});
        return res.status(200).send({adminHotel});
    } catch (error) {
        console.log(error);
        return error;
    }
};


