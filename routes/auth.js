const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const token_secret = require("../config/custom-environment-variables.json");

router.post("/register", async (req, res) => {
    console.log("api-call-done");
    // console.log(req);
    // console.log(res);
    let email = req.body.Email;
    // let email = req.body.Email;
    // let email = req.body.Email;
    let password = req.body.Password;
    // res.send("user registered");
    // Checking User email Id in database
    const emailCheck = await User.findOne({
        email: email
    });

    if (emailCheck) return res.status(400).send("Email already exist.");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create new user

    const user = new User({
        name: req.body.Firstname,
        email: req.body.Email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

//user login

router.post("/login", async (req, res) => {

    // Check user email id in database

    const user = await User.findOne({
        Email: req.body.Email
    });

    if (!user) return res.status(400).send("Email is wrong");

    // Check password

    const validPass = await bcrypt.compare(req.body.Password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    // res.send("User logged In");
    // Create and assign token

    // console.log(token_secret.jwtPrivateKey);
    const token = jwt.sign({
        _id: user._id
    }, token_secret.jwtPrivateKey);

    res.header("auth-token", token).send({
        token: token
    });

    try {

    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;