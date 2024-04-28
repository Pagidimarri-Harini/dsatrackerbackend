const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log_reg_form",
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interview",
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
    },
    username: String,
    text: String,
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('comment', CommentSchema);
