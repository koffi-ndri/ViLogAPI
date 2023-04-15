const { securityLevelValue } = require("../helpers/security_level_value");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config/keys");
const APIError = require("../helpers/apiError");
const Employee = require("../models").Employee;

module.exports.adminAccess = (req, res, next) => {

    if (req.user.security_level === securityLevelValue.ADMIN_LEVEL) {
        return next();
    }
    return next(APIError.sendUnauthorizedAccessResponse("Unauthorized. You need to be an administrator"))
}

module.exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token === "undefined") {
        throw new Error("Token is undefined")
    }

    try {
        const decodedToken = jwt.verify(token, tokenSecret);
        const validEmployee = await Employee.findByPk(decodedToken.userId);
        if (!validEmployee) {
            return next(APIError.sendBadRequestResponse(`Invalid employee id: ${decodedToken.userId}`))
        }
        req.user = validEmployee;
        return next()
    } catch (err){
        next(APIError.sendUnauthorizedAccessResponse(`Unauthorized access`))
    }
}