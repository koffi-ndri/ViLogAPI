const { validationResult } = require("express-validator")

module.exports.validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(422).json(errors.array())
    }

    next();
}