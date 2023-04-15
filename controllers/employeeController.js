const Employee = require("../models").Employee;
const { restart } = require("nodemon");
const APIError = require("../helpers/apiError");
const { hashPassword } = require("../helpers/hashedPassword");
module.exports.registerEmployee = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        phone,
        profession,
        security_level } = req.body;

    const emailExists = await Employee.findOne({
        where: {email}
    })

    if(emailExists) {
        return res.status(422).json({
            message: "Email already exists"
        })
    }

    const hashedPassword = await hashPassword(password);

    const employee = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone,
        profession,
        security_level
    }

    const result = await Employee.create(employee)
    if (!result) {
        return res.status(400).json({
            message: "Couldn't create employee"
        })
    }
    res.status(201).json({
        message: "Employee created successfully",
        result
    });

}

module.exports.getEmployees = async (req, res) => {
    const results = await Employee.findAll({
        attributes: ['firstname', 'lastname', 'email', 'phone', 'profession']
    });
    
    res.status(200).json(results)
}

module.exports.getEmployeesName = async (req, res) => {
    const employeesName = await Employee.findAll({
        attributes: ['id', 'firstname']
    })
    if (employeesName.length === 0){
        return res.status(404).json({
            message: "No hosts were found"
        })
    }
    res.status(200).json(employeesName)
}

module.exports.getEmployee = async (req, res) => {
    const { employeeId } = req.params;

    const employee = await Employee.findByPk(employeeId)

    if (!employee) {
        return next(APIError.sendNotFoundResponse("Employee not found"))
    }
    res.status(200).json(employee)
}

module.exports.updateEmployee = async (req, res) => {
    const {
        firstname, 
        lastname, 
        email, 
        phone, 
        profession } = req.body;

    const isIdValid = await Employee.findByPk(req.user.id);
    if(!isIdValid) {
        return next(APIError.sendBadRequestResponse("Invalid employee id"))
    }

    const data = {
        firstname,
        lastname,
        email,
        phone,
        profession
    }

    const employeeId = isIdValid.id;

    Employee.update(data, {
        where: {id: employeeId}
    }).then(() => {
        res.status(200).json({
            message: "Updated successfully"
        })
    })
}

module.exports.deleteEmployee = async (req, res) => {
    const {employeeId} = req.params;

    const isIdValid = await Employee.findByPk(employeeId);
    if(!isIdValid) {
        return res.status(400).json({
            message: "Invalid Id"
        })
    }

    Employee.destroy({
        where: {id: employeeId}
    }).then(() => {
        restart.status(200).json({
            message: "Deleted successfully"
        })
    })
}