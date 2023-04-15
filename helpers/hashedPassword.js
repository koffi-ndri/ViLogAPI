const bcrypt = require('bcryptjs');

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}