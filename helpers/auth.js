require("dotenv").config()
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const hashPassword = function(password){
    let hashPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    return hashPassword;
}

const checkPassword = function(password, hashPassword){
    let plainPassword = CryptoJS.AES.decrypt(hashPassword, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return password === plainPassword;
}

const createToken = function(user_data){
    return jwt.sign(user_data, process.env.SECRET_TOKEN);
}

const getUserDetail = function(token){
    try{
        return jwt.verify(token, process.env.SECRET_TOKEN)
    }catch(err){
        return false;
    }
}

module.exports = {
    hashPassword,
    checkPassword,
    createToken,
    getUserDetail
}