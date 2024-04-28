const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log_reg_form",
    },
    username: String,
    problem: String,
    lang: String,
    code: String,
    success: Boolean,
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('submission', SubmissionSchema);
