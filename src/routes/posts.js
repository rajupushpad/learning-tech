const express = require('express');
const database = require('../db/connection');
const postModel = require('../dbSchema/postModel');

const router = express.Router();

router.post('/add', async(req, res) => {
    
    const data = new postModel({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        userId: req.body.userId
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/all', async(req,res)=>{
    try {
        const data = await postModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.patch('/update/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await postModel.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/post/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await postModel.findById(id);

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/post/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await postModel.findByIdAndDelete(id);

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;