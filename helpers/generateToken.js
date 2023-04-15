const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config/keys');

module.exports.generateToken = (userId = "", expiresIn = "3h") => {
    return jwt.sign({userId}, tokenSecret, {expiresIn});
}