const express = require('express');
const userModel = require('../dbSchema/userModel');
const database = require('../db/connection');
const { createAuthToken } = require('../middlewares');

const router = express.Router();

router.post('/signup', async(req, res) => {
    
    const data = new userModel({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        img: req.body.img,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/login', async(req, res) => {
    
   
    let email= req.body.email;
    let password= req.body.password;

    try {
        const user = await userModel.findOne({email: email, password: password});

        if(!user) {
            res.status(200).json({message: 'User not exist'});
            return;
        }

        let token = createAuthToken(user);
        res.status(200).json({token: token});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;