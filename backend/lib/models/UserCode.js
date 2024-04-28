const mongoose = require('mongoose');

const UserCodeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log_reg_form",
    },
    problem: String,
    lang: String,
    code: String
})

module.exports = mongoose.model('user_code', UserCodeSchema);