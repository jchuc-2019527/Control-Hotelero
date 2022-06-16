const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');
const AdminApp = require('../models/adminApp.model');
const AdminHotel = require('../models/adminHotel.model');


exports.validateData = (data) => {
    let keys =Object.keys(data), msg = '';
    for(let key of keys) {
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} is required \n`
    }
    return msg.trim();
};

exports.encrypt = async(password)=>{
    try {
        return bcrypt.hashSync(password);
    } catch (error) {
        console.log(error);
        return error;
    }
}
exports.checkPassword = async (password, hashSync) => {
    try {
        return bcrypt.compareSync(password, hashSync);
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.checkPermission = async (userId, sub)=>{
    try{
        if(userId != sub){
            return false;
        }else{
            return true;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkUpdate = async (user)=>{
    if(user.password || 
       Object.entries(user).length === 0 ||  
       user.role){
        return false;
    }else{
        return true;
    }
}
exports.alreadyUser = async (username)=>{
    try{
     let exist = User.findOne({username:username}).lean()
     return exist;
    }catch(err){
        return err;
    }
 }


//  Client

exports.searchUser =async(username)=>{
    try {
        const userExist = await User.findOne({username: username}).lean();
        return userExist
    } catch (error) {
        console.log(error);
        return error;
    }
};


// AdminAPP
exports.searchAdminApp =async(username)=>{
    try {
        const adminAppExist = await AdminApp.findOne({username: username}).lean();
        return adminAppExist
    } catch (error) {
        console.log(error);
        return error;
    }
};

// AdminAPP
exports.searchAdminHotel =async(username)=>{
    try {
        const adminHotelExist = await AdminHotel.findOne({username: username}).lean();
        return adminHotelExist
    } catch (error) {
        console.log(error);
        return error;
    }
};