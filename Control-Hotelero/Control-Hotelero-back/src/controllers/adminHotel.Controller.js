'use strict'
const AdminHotel = require('../models/adminHotel.model')
const {validateData, encrypt, searchAdminHotel} = require('../utils/validate');



//El admin de la App crea un adminHotel
exports.createAdminHotel = async(req, res)=>{
    try {
        const params = req.body;
        const data ={
          name: params.name.toUpperCase(),
          username: params.username,
          password: params.password,
          role: 'ADMIN-HOTEL'
        }

        let msg = validateData(data);
        if(!msg){

          const adminHotelExist = await searchAdminHotel(params.username);
          if(!adminHotelExist){
              data.password= await encrypt(params.password);

              let adminHotel = new AdminHotel(data);
              await adminHotel.save();
              adminHotel.password = undefined;
              return res.status(200).send({message:'adminHotel saved', adminHotel})

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
}