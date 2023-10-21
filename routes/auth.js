const express = require('express');
const router = express.Router();
const {userCollection} = require('../schemas/usersSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');



router.post("/register", async(req,res) =>{
    try {
        const salt = bcrypt.genSaltSync(10);

    const harshedPassword = bcrypt.hashSync(req.body.password, salt);

    await userCollection.create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: harshedPassword,
        role: req.body.role
        
    });
    res.status(201).send("User created successfully.");
    } catch (error) {
        console.log(`Error encountered while creating user.\nError: ${error}`);
    }

});

router.post("/login", async(req,res)=> {
    try {
        const userDetail = await userCollection.findOne({username: req.body.username});

        if(!userDetail)return res.status(404).send("user-not-found.");
    
        const doesPasswordMatch = bcrypt.compareSync(req.body.password,userDetail.password);

        if(!doesPasswordMatch) return res.status(400).send("Invalid-credential");

        const token = jwt.sign({
            userId: userDetail._id,
            username: userDetail.username,
            password: userDetail.password,
            role: userDetail.role
        }, process.env.SECRET);

        res.json({
            isRequestSuccessful: true,
            message: "User logged in successful",
            token
        });

    } catch (error) {
        console.log(`Error while logging in.\nError: ${error}`);
    };
}); 


router.get("/users", async(req,res)=>{
    try {
        let users = await userCollection.find();
        res.send(users);
    } catch (error) {
        console.log(`Error encountered while trying to get all users.\nError:${error};`)
        
    }
});



module.exports = router;