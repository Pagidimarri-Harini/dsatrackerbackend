const { v4: getUUID } = require("uuid");
const { existsSync, mkdirSync, writeFileSync } = require("fs")
const { join } = require("path");

if (!existsSync(join(__basedir, "codes")))
    mkdirSync(join(__basedir, "codes"));

if (!existsSync(join(__basedir, "outputs")))
    mkdirSync(join(__basedir, "outputs"));

const createCodeFile = async (language, code) => {
    const jobID = getUUID();
    const fileName = `${jobID}.${language}`;
    const filePath = join(__basedir, `codes/${fileName}`)

    writeFileSync(filePath, code?.toString())

    return {
        fileName,
        filePath,
        jobID
    };
};

module.exports = {
    createCodeFile,
};
