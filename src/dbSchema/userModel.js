const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: false,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    img: {
        required: false,
        type: String
    },
   role: {
    required: false,
    type: String,
    default: 'student'
   }
});

module.exports = mongoose.model('userData', userSchema)