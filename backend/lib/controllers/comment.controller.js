const { errorLog } = require(__basedir + "/lib/errorHandler")
const Comment = require(__basedir + "/lib/models/Comment.js")
const { User } = require(__basedir + "/lib/models/FormData.js");

const addOne = async (req, res) => {
    try {
        const { postid, text } = req.body
        const user = await User.findOne({ _id: req.user._id }).select("name")
        await Comment.create({
            userid: req.user._id,
            username: user.name,
            postid, text
        })
        res.sendStatus(201)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const reply = async (req, res) => {
    try {
        const { post, replyTo, text } = req.body
        if (post.userid !== req.user._id) {
            return res.sendStatus(403)
        }
        const user = await User.findOne({ _id: req.user._id }).select("name")
        await Comment.create({
            userid: req.user._id,
            username: user.name,
            postid: post._id,
            replyTo, text
        })
        res.sendStatus(201)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const view = async (req, res) => {
    try {
        const data = await Comment.find({ postid: req.params.post }).sort({ date: -1 })
        res.json(data)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const deleteOne = async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.id, userid: req.user._id })
        res.sendStatus(204)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

module.exports = { addOne, reply, view, deleteOne }