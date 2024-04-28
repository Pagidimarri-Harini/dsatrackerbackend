module.exports = (app) => {
  app.use("/i", require(__basedir + "/lib/routes/interview.routes"))
  app.use("/q", require(__basedir + "/lib/routes/question.routes"))
  app.use("/c", require(__basedir + "/lib/routes/comment.routes"))
  app.use("/t", require(__basedir + "/lib/routes/topic.routes"))
  app.use("/u", require(__basedir + "/lib/routes/user.routes"))
};
