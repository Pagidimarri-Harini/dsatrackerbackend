const { existsSync, mkdirSync } = require("fs")

const check = dir =>
    !existsSync(dir) && mkdirSync(dir)

module.exports = () => {
    check(__basedir + "/data")
    check(__basedir + "/static")
    check(__basedir + "/data/driver_codes")
    check(__basedir + "/data/question_data")
    check(__basedir + "/data/testcases")
}