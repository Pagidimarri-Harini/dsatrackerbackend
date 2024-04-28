const mongoose = require('mongoose');
const { compareSync } = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})
UserSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.password);
};

const questionSchema = new mongoose.Schema({
  Topic: String,
  Problem: String,
  Done: Boolean,
  Bookmark: Boolean,
  Notes: String,
  URL: String,
});
const topicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "log_reg_form",
  },
  topicName: String,
  position: Number,
  started: Boolean,
  doneQuestions: Number,
  questions: [questionSchema],
});

const TopicModel = mongoose.model('450dsaArchive', topicSchema);

const User = mongoose.model('log_reg_form', UserSchema);

module.exports = { User, TopicModel };
