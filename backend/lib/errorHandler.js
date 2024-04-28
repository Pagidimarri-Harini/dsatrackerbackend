const { existsSync, mkdirSync, appendFileSync } = require('fs')

const errDir = __basedir + '/.errorlogs'
!existsSync(errDir) && mkdirSync(errDir)

const errorLog = (errObj) => {
    try {
        const errorFile = errDir + `/errorlogs-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`
        errObj.msg = errObj.message
        errObj.nm = errObj.name
        errObj.stk = errObj.stack
        errObj.loggedAt = Date.now()
        appendFileSync(errorFile, JSON.stringify(errObj) + "\n", "utf-8")
    } catch (error) { console.log(errObj); }
}

module.exports = { errorLog }