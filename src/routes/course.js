const express = require('express');
const database = require('../db/connection');
const courseSchema = require('../dbSchema/courseSchema');
const contentSchema = require('../dbSchema/contentSchema');
const topicSchema = require('../dbSchema/topicSchema');

const router = express.Router();

router.post('/add', async(req, res) => {
    
    let data;
    let categoryId = parseInt(req.body?.categoryId);
    let dataToSave;

    if(categoryId) {
        data = new courseSchema({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            categoryId: categoryId,
            image: req.body.image
        });

        dataToSave = await data.save();
    } else {
        dataToave = 'Invalid category';
    }
    

    try {
        res.status(200).json({message: 'Course added successfully', course: dataToSave});
    }
    catch (error) {
        res.status(400).json({message: error.message, course: {}});
    }
});

router.get('/all', async(req,res)=>{
    try {
        const data = await courseSchema.find();
        res.json({
            message: 'Course found successfully.',
            courses: data
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            courses: []
        });
    }
});

router.patch('/update/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await courseSchema.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send({message: 'Course updated successfully.', course: result});

    } catch(error) {
        res.status(400).json({ message: error.message, course: {} });
    }
});

router.get('/:id', async(req,res)=>{
    try {

        let topicsData = [];

        const id = req.params.id;
        const result = await courseSchema.findById(id);
        topicSchema.find({courseId: id}).then(async(topics)=>{

            for(let topic of topics) {
                let updatedTopc = {};
                updatedTopc.title = topic.title;
                updatedTopc.description = topic.description;
                updatedTopc._id = topic._id;

                let contents = await contentSchema.find({topicId: topic._id});
                updatedTopc.contents = contents;
                topicsData.push(updatedTopc);
            }

            res.send({
                message: 'Course fetched successfully',
                course: result,
                topics: topicsData
            });
        });       

    } catch(error) {
        res.status(400).json({ message: error.message, course: {} });
    }
});

router.delete('/:id', async(req,res)=>{
    try {

        const id = req.params.id;
        const result = await 

        res.send(result);

    } catch(e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
