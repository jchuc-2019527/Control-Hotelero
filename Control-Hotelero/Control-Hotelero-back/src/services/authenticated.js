'use strict'

const jwt = require ('jwt-simple');
const secretKey = 'SecretKeyToExample';
const secretKey1 = 'SecretKeyToExample1';


exports.ensureAuth = async (req, res, next)=>{
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, secretKey);
            
        } catch (error) {
            console.log(error);
            return res.status(401).send({message:'Token is not valid or expired'})
        }

        req.user = payload;
        next();

    }else{
        return res.status(403).send({message:'The requested does not contain the authentication header'});
    }
    
};

exports.ensureAuth1 = async (req, res, next)=>{
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload1 = jwt.decode(token, secretKey1);

        } catch (error) {
            console.log(error);
            return res.status(401).send({message:'Token is not valid or expired'})
        }

        req.adminHotel = payload1;
        next();

    }else{
        return res.status(403).send({message:'The requested does not contain the authentication header'});
    }

};

exports.isAdmin = async (req, res, next)=>{
    try {
        const user = req.user;
        if(user.role === 'ADMIN-APP'){
            return next();
        }else{
            return res.status(403).send({message:'User unauthorized'});
        }
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
}

exports.isAdminHotel = async (req, res, next)=>{
    try {
        const adminHotel = req.adminHotel;
        if(adminHotel.role === 'ADMIN-HOTEL'){
            return next();
        }else{
            return res.status(403).send({message:'User unauthorized'});
        }
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
}