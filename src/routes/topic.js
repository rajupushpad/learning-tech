const express = require('express');
const database = require('../db/connection');
const topicSchema = require('../dbSchema/topicSchema');

const router = express.Router();

router.post('/add', async(req, res) => {
    
    let data;
    let courseId = req.body?.courseId;
    let dataToSave;

    if(courseId) {
        data = new topicSchema({
            title: req.body.title,
            description: req.body.description,
            courseId: courseId
        });

        dataToSave = await data.save();
    } else {
        dataToave = 'Invalid course';
    }
    

    try {
        res.status(200).json({
            message: "Topic added successfully.",
            topic: dataToSave
        });
    }
    catch (error) {
        res.status(400).json({message: error.message, topic: {}});
    }
});

router.get('/all', async(req,res)=>{
    try {
        const data = await topicSchema.find();
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

        const result = await topicSchema.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send({
            message: 'Topic updated successfully.',
            topic: result
        });

    } catch(error) {
        res.status(400).json({ message: error.message, topic: {} });
    }
});

router.get('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await topicSchema.findById(id);

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
        const result = await topicSchema.findByIdAndDelete(id);

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;