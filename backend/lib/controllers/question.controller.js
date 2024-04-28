const { existsSync, readFileSync } = require("fs")
const { errorLog } = require(__basedir + "/lib/errorHandler")
const UserCodeModel = require(__basedir + "/lib/models/UserCode.js")

const dataDir = __basedir + "/data/question_data"
const codeDir = __basedir + "/data/driver_codes"

const langs = { python: "py", cpp: "cpp", java: "java", javascript: "js" }

const getQuestion = async (req, res) => {
    try {
        const filePath = `${dataDir}/${req.params.question}.json`
        if (!existsSync(filePath)) {
            return res.sendStatus(404)
        }
        const question = require(filePath)
        res.json(question)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const getCode = async (req, res) => {
    try {
        let code;
        if (req.params.key === "1") {
            code = await UserCodeModel.findOne({ user: req.user._id, problem: req.params.question, lang: req.params.lang }).select("code")
        }
        if (code) {
            code = code.code
        } else {
            const filePath = `${codeDir}/${req.params.question}.${langs[req.params.lang]}`
            if (!existsSync(filePath)) {
                return res.sendStatus(404)
            }
            code = readFileSync(filePath, "utf-8")
        }
        res.json({ code })
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const saveUserCode = async (req, res) => {
    try {
        await UserCodeModel.updateOne({
            user: req.user._id,
            problem: req.params.question,
            lang: req.params.lang
        },
            { code: req.body.code },
            { upsert: true })
        res.sendStatus(204)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = { getQuestion, getCode, saveUserCode }