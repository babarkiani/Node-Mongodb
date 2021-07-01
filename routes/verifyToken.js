const jwt = require("jsonwebtoken");
const token_secret = require("../config/custom-environment-variables.json");
const verify = require("../routes/verifyToken");
module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(400).send("Access Denied");

    try {
        const verified = jwt.verify(token, token_secret.jwtPrivateKey);

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}