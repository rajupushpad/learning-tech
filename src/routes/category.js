const express = require('express');
const database = require('../db/connection');
const categorySchema = require('../dbSchema/categorySchema');
const courseSchema = require('../dbSchema/courseSchema');

const router = express.Router();

router.post('/add', async (req, res) => {

    let data;
    let userId = req.body?.userId;
    let catRes = {};
    let dataToSave;

    if (userId) {
        data = new categorySchema({
            title: req.body.title,
            description: req.body.description,
            userId: userId
        });

        dataToSave = await data.save();

        catRes = {
            message: 'category created successfully',
            category: dataToSave
        }
    } else {
        catRes = {
            message: 'Invalid user',
            category: {}
        }
    }

    try {
        res.status(200).json(catRes);
    }
    catch (error) {
        res.status(400).json({ message: error.message, category: {} });
    }
});

router.get('/all', async (req, res) => {
    try {
        const data = await categorySchema.find();
        res.json({ message: 'category fetched successfully', categories: data })
    }
    catch (error) {
        res.status(400).json({ message: error.message, categories: [] });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await categorySchema.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send({ message: 'Category updated successfully.', category: result });

    } catch (error) {
        res.status(400).json({ message: error.message, category: {} });
    }
});

router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const category = await categorySchema.findById(id);
    
        const courseOfCategory = await courseSchema.find({categoryId: parseInt(id)});

        res.send({
            message: "Category find successfully.",
            category: {
                title: category.title,
                description: category.description,
                _id: category._id,
                courses: courseOfCategory || []
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message, category: {} });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const result = await categorySchema.findByIdAndDelete(id);

        res.send(result);

    } catch (e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;