const mangoose = require('mongoose');

const topicSchema = new mangoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    courseId: {
        required: true,
        type: String
    }
});

module.exports = mangoose.model('topicData', topicSchema);