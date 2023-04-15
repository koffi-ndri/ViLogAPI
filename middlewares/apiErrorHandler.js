const APIError = require("../helpers/apiError");

module.exports.apiErrorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        console.error(err);
        return res.status(err.code).json({error: err.message});
    }
}