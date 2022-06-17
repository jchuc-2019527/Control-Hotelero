'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

const secretKey = 'SecretKeyToExample';
const secretKey1 = 'SecretKeyToExample1';

exports.createToken = async (user) => {
    try {
        const payload = {
            sub: user._id,
            name: user.name,
            username: user.username,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(5, 'hours').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err) {
        console.log(err);
        return err;
    }
};
exports.createToken1 = async (adminHotel) => {
    try {
        const payload1 = {
            sub: adminHotel._id,
            name: adminHotel.name,
            username: adminHotel.username,
            role: adminHotel.role,
            iat: moment().unix(),
            exp: moment().add(5, 'hours').unix()
        }
        return jwt.encode(payload1, secretKey1);
    }catch(err) {
        console.log(err);
        return err;
    }
}

