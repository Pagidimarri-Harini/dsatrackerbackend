const cors = require('cors');
const express = require('express');
const app = express();

const limit = process.env.UPLOAD_SIZE || "50mb"  // request body size
const port = 3001
global.__basedir = process.cwd(); // app root directory

app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true }));
app.use(cors());

require(__basedir + "/lib/dirCheck")()
require(__basedir + "/lib/dbConn")()
require(__basedir + "/lib/routes/index.routes")(app)

app.use("/", express.static(__basedir + '/static')) // serve a public folder

app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});

/*
// pm2
// urls
// input validation
// select/lean/limit in queries
*/