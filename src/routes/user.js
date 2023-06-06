const express = require('express');
const database = require('../db/connection');
const userData = require('../dbSchema/userModel');

const router = express.Router();

router.post('/add', async(req, res) => {
    
    let data;
    let dataToSave;

    data = new userData({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    dataToSave = await data.save();

    try {
        res.status(200).json({
            message: "User added successfully.",
            user: dataToSave
        });
    }
    catch (error) {
        res.status(400).json({message: error.message, user: {}});
    }
});

router.get('/all', async(req,res)=>{
    try {
        const data = await userData.find();
        res.json({
            message: "User find successfully",
            users: data
        })
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/update/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await userData.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send({
            message: 'User details updated successfully.',
            topic: result
        });

    } catch(error) {
        res.status(400).json({ message: error.message, topic: {} });
    }
});

router.get('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await userData.findById(id);

        res.send({
            message: "Topic fetched successfully.",
            topic: result
        });

    } catch(e) {
        res.status(400).json({ message: error.message, topic: {} });
    }
});

router.delete('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await userData.findByIdAndDelete(id);

        res.send({
            message: 'User deleted successfully',
            user: result
        });

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;