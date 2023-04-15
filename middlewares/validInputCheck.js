const { default: validator } = require('validator');
const { securityLevelValue } = require('../helpers/security_level_value');

module.exports.validateEmail = (req, res, next) => {
    const {email} = req.body;
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    next();
}

module.exports.validateSecurityLevel = (req, res, next) => {
    const {security_level} = req.body;
    const isValidSecurityLevel = (security_level === securityLevelValue.ADMIN_LEVEL) || (security_level === securityLevelValue.HOST_LEVEL)

    if (!isValidSecurityLevel) return res.status(400).json({ message: 'Invalid security level' });
    next();
}