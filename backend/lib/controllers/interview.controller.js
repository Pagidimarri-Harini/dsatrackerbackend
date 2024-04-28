const { errorLog } = require(__basedir + "/lib/errorHandler")
const Interview = require(__basedir + "/lib/models/Interview.js")
const { User } = require(__basedir + "/lib/models/FormData.js");
const fs = require("fs");

const dataDir = __basedir + "/data/question_data"
const uploadDir = __basedir + "/uploads";
const updateQuestion = (questions = [], company, type = "add") => {
    // to add/remove company tag on question
    for (let i = 0; i < questions.length; i++) {
        const _q = questions[i];
        const _fl = `${dataDir}/${_q}.json`
        if (!fs.existsSync(_fl)) return res.sendStatus(400)

        const data = require(_fl)
        if (type === "add")
            !data.companies.includes(company) && data.companies.push(company)
        else {
            const j = data.companies.indexOf(company)
            j !== -1 && data.companies.slice(j, 1)
        }

        fs.writeFileSync(_fl, JSON.stringify(data), "utf-8")
    }
}

const addOne = async (req, res) => {
    try {
        const { title, company, year, position, location, category, verdict, text, questions } = req.body
        updateQuestion(questions, company)
        const user = await User.findOne({ _id: req.user._id }).select("name")
        await Interview.create({
            username: user.name, userid: req.user._id,
            company: company.toLowerCase(),
            title, year, position, location,
            category, verdict, text, questions
        })
        res.sendStatus(201)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const getList = async (req, res) => {
    try {
        const key = req.params.key
        if (key === "me") {
            const data = await Interview.find({ userid: req.user._id }).select("-text")
            res.json(data)

        } else {
            const data = await Interview.find({ company: key.toLowerCase() }).select("-text")
            res.json(data)

        }
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    try {
        const data = await Interview.findOne({ _id: req.params.id })
        let self = false
        if (req.user._id && data.userid.toString() === req.user._id) {
            self = true
        }
        res.json({ interview: data, self })
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const updateOne = async (req, res) => {
    try {
        const updatedData = await Interview.findOneAndUpdate({ _id: req.params.id, userid: req.user._id }, req.body, { new: true })
        updateQuestion(updatedData.questions, updatedData.company)
        res.sendStatus(204)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

const deleteOne = async (req, res) => {
    try {
        const deleted = await Interview.findOneAndDelete({ _id: req.params.id, userid: req.user._id })
        if (deleted) {
            const remaining = await Interview.countDocuments({ company: deleted.company })
            remaining === 0 && updateQuestion(deleted.questions, deleted.company, "remove")
        }
        res.sendStatus(204)
    } catch (error) {
        errorLog(error)
        res.sendStatus(500)
    }
}

module.exports = { addOne, getList, getOne, updateOne, deleteOne }