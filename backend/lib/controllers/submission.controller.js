const { errorLog } = require(__basedir + "/lib/errorHandler")
const { existsSync, writeFileSync } = require("fs")
const Submission = require(__basedir + "/lib/models/Submission.js")
const { User } = require(__basedir + "/lib/models/FormData.js");

/*
// to run on server
const { runCode } = require(__basedir + "/lib/run-code");
const langs = { python: "py", cpp: "cpp", java: "java", javascript: "js" }
*/
// to run on api
const { runCode } = require(__basedir + "/lib/controllers/runCodeByApi");
const langs = { python: "python3", cpp: "cpp", java: "java", javascript: "nodejs" }



const inputDir = __basedir + "/data/testcases"
const dataDir = __basedir + "/data/question_data"

const runCodeApi = async (req, res) => {
    try {
        const { lang, code } = req.body
        const inputFile = `${inputDir}/${req.params.question}.json`
        if (!langs[lang] || !existsSync(inputFile)) {
            return res.sendStatus(400)
        }

        const { cases } = require(inputFile)
        const rs = await runCode({ language: langs[lang], code: code, input: cases[0].input })

        res.json({ input: cases[0].input, got: rs, expected: cases[0].output })
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const submitCodeApi = async (req, res) => {
    try {
        const { lang, code } = req.body
        const inputFile = `${inputDir}/${req.params.question}.json`
        const dataFile = `${dataDir}/${req.params.question}.json`
        if (!langs[lang] || !existsSync(inputFile)) {
            return res.sendStatus(400)
        }

        const { cases } = require(inputFile)
        let passed = 0
        let success = false

        for (let i = 0; i < cases.length; i++) {
            const el = cases[i];
            const rs = await runCode({ language: langs[lang], code: code, input: el.input })
            if (rs.output && rs.output === el.output) {
                // passed
                passed++
            }
        }
        if (passed === cases.length) success = true

        const user = await User.findOne({ _id: req.user._id }).select("name")
        await Submission.create({
            userid: req.user._id,
            username: user.name,
            problem: req.params.question,
            lang, code, success
        })
        const qd = require(dataFile)
        qd.submissions++
        writeFileSync(dataFile, JSON.stringify(qd), "utf-8")

        res.json({ total: cases.length, passed })
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const getSubmissions = async (req, res) => {
    try {
        if (req.params.key === "0") {
            const data = await Submission.find({ problem: req.params.question, userid: req.user._id }).sort({ date: -1 })
            return res.json(data)
        }
        const data = await Submission.find({ problem: req.params.question }).sort({ date: -1 })
        return res.json(data)

    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = { runCodeApi, submitCodeApi, getSubmissions }