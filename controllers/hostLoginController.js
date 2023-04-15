const Employee = require('../models').Employee;
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/generateToken');

module.exports.hostLogin = async (req, res) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({
        where: { email }
    });

    if (!employee) return res.status(404).json({ message: 'Email does not exist' });

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
    const token = generateToken(employee.id);

    res.status(200).json({
        message: "Login successfully",
        token,
        employee: employee.dataValues
    })
}