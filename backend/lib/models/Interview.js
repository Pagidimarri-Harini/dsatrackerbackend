const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log_reg_form",
    },
    username: String,
    title: String,
    company: String,
    year: Number,
    position: String,
    location: String,
    category: String,
    verdict: String,
    text: String,
    questions: Array,
})

module.exports = mongoose.model('interview', InterviewSchema);
