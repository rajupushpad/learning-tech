const express = require('express');
const userModel = require('../dbSchema/userModel');
const database = require('../db/connection');
const { createAuthToken } = require('../middlewares');
const enrollSchema = require('../dbSchema/enrollSchema');

const router = express.Router();

router.post('/signup', async (req, res) => {

    const data = new userModel({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        img: req.body.img,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json({ user: dataToSave });
    }
    catch (error) {
        res.status(400).json({ user: { message: error.message } });
    }
});

router.post('/login', async (req, res) => {


    let email = req.body.email;
    let password = req.body.password;

    try {
        let user = await userModel.findOne({ email: email, password: password });
        let registeredCourses = [];

        if (!user) {
            res.status(200).json({ user: { message: 'User not exist' } });
            return;
        }

        try {
            let courses = await enrollSchema.find({ studentId: user.id });
            registeredCourses = courses.map((item) => {
                return item.courseId;
            });
        } catch (e) { }

        let resData = {
            token: createAuthToken(user),
            message: 'Logged in successfully',
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            role: user.role,
            registeredCourses: registeredCourses
        };

        res.status(200).json({ user: resData });
    }
    catch (error) {
        res.status(400).json({ user: { message: error.message } });
    }
});

module.exports = router;