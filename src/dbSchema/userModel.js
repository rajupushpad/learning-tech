const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
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
        require: true,
        type: Boolean
    },
    isEndUser: {
        required: true,
        type: Boolean
    },
    isContributor: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('userData', userSchema)