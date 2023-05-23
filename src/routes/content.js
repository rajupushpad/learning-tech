const express = require('express');
const database = require('../db/connection');
const contentSchema = require('../dbSchema/contentSchema');

const router = express.Router();

router.post('/add', async(req, res) => {
    
    let data;
    let topicId = req.body?.topicId;
    let dataToSave;

    if(topicId) {
        data = new contentSchema({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            textContent: req.body.textContent,
            topicId: topicId
        });

        dataToSave = await data.save();
    } else {
        dataToave = 'Invalid user';
    }
    
    try {
        res.status(200).json({
            message: 'Content added successfully.',
            content: dataToSave
        });
    }
    catch (error) {
        res.status(400).json({message: error.message, content: {}});
    }
});

router.get('/all', async(req,res)=>{
    try {
        const data = await contentSchema.find();
        res.json({
            message: 'Contents fetched successfully.',
            contents: data
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            contents: []
        });
    }
});

router.patch('/update/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await contentSchema.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send({
            message: 'Content updated successfully',
            content: result
        });

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await contentSchema.findById(id);

        res.send({
            message: "Content fetched successfully.",
            content: result
        });

    } catch(e) {
        res.status(400).json({ 
            message: error.message,
            content: {}
        });
    }
});

router.delete('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await contentSchema.findByIdAndDelete(id);

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;