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
    isAdmin: {
        require: false,
        type: Boolean
    },
    isEndUser: {
        required: false,
        type: Boolean
    },
    isContributor: {
        required: false,
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('userData', userSchema)