const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('categoryData', categorySchema)
