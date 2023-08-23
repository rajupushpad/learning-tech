const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    categoryId: {
        required: true,
        type: Number
    },
    image: {
        required: false,
        type: String
    }
});

module.exports = mongoose.model('courseData', courseSchema)
