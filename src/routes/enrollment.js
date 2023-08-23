const express = require('express');
const database = require('../db/connection');
const enrollSchema = require('../dbSchema/enrollSchema');

const router = express.Router();

router.post('/', async (req, res) => {

    const data = new enrollSchema({ ...req.body });

    try {
        let dataToSave = await data.save();
        let courses = await enrollSchema.find({ studentId: req.body.studentId });
        let registeredCourses = courses.map((item) => item.courseId);

        let resData = {
            enrollment: dataToSave,
            registeredCourses: registeredCourses
        };

        res.status(200).json(resData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await enrollSchema.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: false };

        const result = await enrollSchema.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);

    } catch (e) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const result = await enrollSchema.findById(id);

        res.send(result);

    } catch (e) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const result = await enrollSchema.findByIdAndDelete(id);

        res.send(result);

    } catch (e) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;