const adminRouter = require('express').Router();
const { registerEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { validateEmail, validateSecurityLevel } = require('../middlewares/validInputCheck');
const { requiredFields } = require('../middlewares/requiredFields');
const { validateFields } = require('../middlewares/validateFields');
const { getEmployees } = require('../controllers/employeeController');
const { adminAccess } = require('../middlewares/permissions');
const { graph } = require('../controllers/graph');

adminRouter.post('/register-employee',
    requiredFields([
        'firstname',
        'lastname',
        'email',
        'password',
        'phone',
        'profession',
        'security_level']),
        validateFields,
        validateEmail,
        validateSecurityLevel,
        adminAccess,
        registerEmployee);

adminRouter.get('/get-employees', adminAccess, getEmployees)
adminRouter.delete('/delete-employee/:employeeId', adminAccess, deleteEmployee)  

adminRouter.get('/get-graph', adminAccess, graph)
module.exports = adminRouter;