'use strict'
const AdminHotel = require('../models/adminHotel.model')
const {validateData, encrypt, searchAdminHotel} = require('../utils/validate');



// Admin-Hotel - editar su cuenta
exports.updateAdminHotel = async (req, res)=>{
    try{
        const userId = req.params.id;
        const params = req.body;
        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(403).send({message: 'Unauthorized to update this user'});
        else{
            const notUpdated = await checkUpdate(params);
            if(notUpdated === false) return res.status(400).send({message: 'Unable to update this data'});
            const already = await searchUser(params.username);
            if(!already){
                const userUpdated = await User.findOneAndUpdate({_id: userId}, params, {new:true})
                .lean()
                return res.send({ userUpdated, message: 'User updated'});
            }else{
                return res.send({message: 'Username already exist'})
            } 
        }    
    }catch(err){
        console.log(err);
        return err;
    }
}