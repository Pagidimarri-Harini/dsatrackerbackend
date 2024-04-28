const mongoose = require('mongoose');
const { errorLog } = require(__basedir + "/lib/errorHandler")

async function dbConn() {
    try {
        await mongoose.connect('mongodb+srv://user:harini@mern-stack.d5q8bma.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Stack');
        return console.log("connected to database");
    } catch (error) {
        errorLog(error)
        console.error("could not connect to database");
    }
}

module.exports = dbConn;