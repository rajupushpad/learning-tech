const mangoose = require('mongoose');

const categorySchema = new mangoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('categoryData', categorySchema)