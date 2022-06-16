'use strict'
const User = require('../models/user.model');
const {validateData, encrypt, searchUser, checkPassword, searchAdminApp, searchAdminHotel, checkPermission,checkUpdate, alreadyUser} = require('../utils/validate');
const {createToken} = require('../services/jwt');

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
                const token = await createToken(search);
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
}

// Cliente - editar su cuenta
exports.updateUser = async (req, res)=>{
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

exports.deleteUser = async(req, res)=>{
    try{
        const userId = req.params.id;
        const persmission = await checkPermission(userId, req.user.sub);
        if(persmission === false) return res.status(403).send({message: 'You dont have permission to delete this user'});
        const userDeleted = await User.findOneAndDelete({_id: userId});
        if(userDeleted) return res.send({message: 'Account deleted', userDeleted});
        return res.send({message: 'User not found or already deleted'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error deleting user'});
    }
}    