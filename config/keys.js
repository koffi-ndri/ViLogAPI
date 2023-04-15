require("dotenv").config();

module.exports = {
    tokenSecret: process.env.TOKEN_SECRET,
    originalAdminDetails: {
        email: process.env.ORIGINAL_ADMIN_EMAIL,
        password: process.env.ORIGINAL_ADMIN_PASSWORD,
        secret_code: process.env.ORIGINAL_ADMIN_SECRET_CODE
    },
    vilogDetails: {
        host: process.env.VILOG_HOST,
        email: process.env.VILOG_EMAIL,
        password: process.env.VILOG_PASSWORD,
        subject: process.env.VILOG_SUBJECT
    }
}