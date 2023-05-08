const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    img: {
        required: true,
        type: String
    },
    videoUrl: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    likes: {
        required: true,
        type: Number
    },
    disLikes: {
        required: true,
        type: Number
    },
    watchCount: {
        required: true,
        type: Number
    },
    userId: {
        required: true,
        type: Number
    },
    topicId: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('postData', postSchema)