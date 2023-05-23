const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    textContent: {
        required: true,
        type: String
    },
    topicId: {
        required: true,
        type: String
    },
    docUrl: {
        required: false,
        type: String
    },
    likes: {
        required: false,
        type: Number
    },
    dislikes: {
        required: false,
        type: Number
    },
    userWatched: {
        required: false,
        type: Boolean
    },
    watchCount: {
        required: false,
        type: Number
    }
});

module.exports = mongoose.model('contentData', contentSchema)
