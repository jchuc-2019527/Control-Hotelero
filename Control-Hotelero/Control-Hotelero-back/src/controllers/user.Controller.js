'use strict'
const User = require('../models/user.model');
const {validateData, encrypt, searchUser, checkPassword, searchAdminApp, searchAdminHotel, checkPermission,checkUpdate, alreadyUser} = require('../utils/validate');
const {createToken, createToken1} = require('../services/jwt');
const Reservation = require('../models/reservations.model');
const Room = require('../models/rooms.model');
const AdminApp = require('../models/adminApp.model');
const AdminHotel = require ('../models/adminHotel.model')


// Register Client
exports.registerUser = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }

        let msg = validateData(data);
        if(!msg){
            const userExist = await searchUser(params.username);
            if(!userExist){
                data.password= await encrypt(params.password);

                let user = new User(data);
                await user.save();
                user.password = undefined;
                return res.status(200).send({message:'User saved', user});

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

//LOGIN
exports.login = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);
        if (!msg) {
            let search = await searchUser(params.username);
            if (search && await checkPassword(params.password, search.password)) {
                const token = await createToken(search);
                return res.status(200).send({token, message: 'Login successfully', search});

            } else {
                let search = await searchAdminApp(params.username);
            if (search && await checkPassword(params.password, search.password)) {
                const token = await createToken(search);
                return res.status(200).send({token, message: 'Login successfully', search});
            }else {
                let search = await searchAdminHotel(params.username);
            if (search && await checkPassword(params.password, search.password)) {
                const token = await createToken1(search);
                return res.status(200).send({token, message: 'Login successfully', search});
            }
        }
                return res.status(400).send({message: 'Username or password incorrect'});
            }  

            
        } else {
            return res.status(400).send(msg);
        
        }
        
    } catch (err) {
        console.log(err);
        return err;
    }
};

//Mostrar Cliente

exports.getUser = async (req, res)=>{
    try {
        const idClient = req.params.idClient;
        var user = await User.findOne({_id: idClient});
        if(user){
            return res.status(200).send({user})
        };
        var user = await AdminApp.findOne({_id: idClient});
        if(user){
            return res.status(200).send({user})
        };
        var user = await AdminHotel.findOne({_id: idClient});
        if(user){
            return res.status(200).send({user})
        };

        
    } catch (error) {
        console.log(err);
        return err;
    }
}

// Cliente - editar su cuenta
exports.updateUser = async (req, res)=>{
    try{
        const userId = req.params.idClient;
        const params = req.body;
        const userExist = await User.findOne({_id: userId})

        const already = await User.findOne({username: params.username})
        if(already && userExist.username != params.username){
            return res.status(400).send({message:'Username already in use'});
        }else{
            const userUpdate = await User.findOneAndUpdate({_id: userId}, params, {new:true});
            return res.status(200).send({message:'User updated succesfuly', userUpdate});
        }
    }catch(err){
        console.log(err);
        return err;
    }
};

//FUNCION PARA ELIMINAR UNA CUENTA
exports.deleteUser = async (req, res) => {
    try {
        const idClient = req.params.idClient;
        const reservations = await Reservation.find({user: idClient});
        let reservationsNew = Object.values(reservations);
        for(let i = 0; i < reservationsNew.length; i++){
            var startReservation = reservationsNew[i].startDate;
            var finalReservation = reservationsNew[i].finishDate;
            var idRoom = reservationsNew[i].room;
            const room = await Room.findOne({_id: idRoom});
            const arrayDates = Object.values(room.dates);
            arrayDates.forEach((item) => {
                //ESTOS VIENEN DE LA DB
                var start = item.date.startDate;
                var final = item.date.finishDate;
                
                if(start.getTime() == startReservation.getTime() && final.getTime() == finalReservation.getTime()){
                    arrayDates.splice(arrayDates.indexOf(item), 1);
                }
            });
            const roomUpdated = await Room.findOneAndUpdate({_id: idRoom}, {dates: arrayDates}, {new: true});
            const reservationDeleted = await Reservation.findOneAndDelete({_id: reservationsNew[i]._id});
            
        }
        const clientDeleted = await User.findOneAndDelete({_id: idClient});  
        return res.status(200).send({message: "User Deleted"}); 
    } catch (err) {
        console.log(err);
        return err;  
    } 
};