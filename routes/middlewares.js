const express = require('express');
const { shopItemsCollection } = require('../schemas/shopItemsSchema');
const route = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();



function isUserLoggedIn(req, res, next){
    let authorizationHeader = req.headers.authorization;
    console.log(req.body);

    if (!authorizationHeader){
        return res.status(401).send("no-authorization-header");
    }

    let value = authorizationHeader.split(" ");

    let tokenType = value[0];

    let tokenValue = value[1];

    if(tokenType == "Bearer"){
        const decoded = jwt.verify(tokenValue, process.env.SECRET);
        req.decoded = decoded;
        
        
        next();
        return;
    };

    res.status(403).send("action-not-allowed");
};


function adminsOnly(req, res, next){
    console.log(req.body);
    if(req.decoded.role == "admin"){
        next();
    }else return res.status(401).send("You are not an admin.");
}




module.exports = {
    isUserLoggedIn,
    adminsOnly
}