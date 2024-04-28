const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { errorLog } = require(__basedir + "/lib/errorHandler")
const { User } = require(__basedir + "/lib/models/FormData.js");
const jwtSecret = 'th1si$pas5w0rd';

const addAcc = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(200).json({ success: false, message: 'User already exists. Please log in.' });
    }

    const salt = bcrypt.genSaltSync(14)
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, jwtSecret, { expiresIn: "365d" });
    res.status(201).json({ success: true, message: 'User created successfully', token });
  } catch (error) {
    errorLog(error);
    res.status(500).json({ success: false, error: 'Error creating user' });
  }
};

const loginAcc = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      return res.status(200).json({ success: false, message: 'Email not found' });
    }
    if (!existingUser.comparePassword(password)) {
      return res.status(200).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign({ _id: existingUser._id }, jwtSecret, { expiresIn: "365d" });
    res.status(200).json({ success: true, message: 'Login successful', token, user: existingUser });
  } catch (error) {
    errorLog(error);
    res.status(500).json({ success: false, error: 'Error checking login credentials' });
  }
};

const authUser = async (req, res, next) => {
  try {
    const userToken = req.header("authToken");
    let data = jwt.verify(userToken, jwtSecret);
    req.user = data;
    next();
  } catch (error) {
    errorLog(error);
    res.sendStatus(401);
  }
}

const getId = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user._id }).select("_id")
    res.json(data)
  } catch (error) {
    errorLog(error);
    res.sendStatus(500);
  }
}

module.exports = {
  addAcc,
  loginAcc,
  authUser,
  getId
};

