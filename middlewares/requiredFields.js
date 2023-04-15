const { body } = require("express-validator")
//const { isTruthy } = require("../helpers/isTruthy")

module.exports.requiredFields = (array) => {
   return array.map(field => body(field).notEmpty().withMessage(`${field} required`));
}