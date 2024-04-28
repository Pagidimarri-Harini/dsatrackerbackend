const { join } = require('path')

const commandMap = (jobID, language) => {
    switch (language) {
        case 'java':
            return {
                executeCodeCommand: 'java',
                executionArgs: [
                    join(__basedir, `codes/${jobID}.java`)
                ],
                compilerInfoCommand: 'java --version'
            };
        case 'cpp':
            return {
                compileCodeCommand: 'g++',
                compilationArgs: [
                    join(__basedir, `codes/${jobID}.cpp`),
                    '-o',
                    join(__basedir, `outputs/${jobID}.out`)
                ],
                executeCodeCommand: join(__basedir, `outputs/${jobID}.out`),
                outputExt: 'out',
                compilerInfoCommand: 'g++ --version'
            };
        case 'py':
            return {
                executeCodeCommand: 'python3',
                executionArgs: [
                    join(__basedir, `codes/${jobID}.py`)
                ],
                compilerInfoCommand: 'python3 --version'
            }
        case 'js':
            return {
                executeCodeCommand: 'node',
                executionArgs: [
                    join(__basedir, `codes/${jobID}.js`)
                ],
                compilerInfoCommand: 'node --version'
            }
    }
}

const supportedLanguages = ['java', 'cpp', 'py', 'js'];

module.exports = { commandMap, supportedLanguages }