const { unlinkSync } = require("fs"),
    { join } = require("path");

const removeCodeFile = async (uuid, lang, outputExt) => {
    const codeFile = join(__basedir, `codes/${uuid}.${lang}`),
        outputFile = join(__basedir, `outputs/${uuid}.${outputExt}`);

    unlinkSync(codeFile);

    if (outputExt)
        unlinkSync(outputFile);
};

module.exports = {
    removeCodeFile,
};
