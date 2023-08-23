const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    courseId: {
        required: true,
        type: String
    },
    courseName: {
        required: true,
        type: String
    },
    studentId: {
        required: true,
        type: String
    },
    paymentStatus: {
        required: true,
        type: String
    },
    learningStatus: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('enrollData', enrollSchema);
