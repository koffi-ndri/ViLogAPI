const hostRouter = require('express').Router();
const { hostLogin } = require('../controllers/hostLoginController');
const { validateEmail } = require('../middlewares/validInputCheck');
const { requiredFields } = require('../middlewares/requiredFields');
const { validateFields } = require('../middlewares/validateFields');
const { verifyToken } = require('../middlewares/permissions');
const { getAllVisitors } = require('../controllers/visitorController');
const { updateEmployee, getEmployee } = require('../controllers/employeeController');

hostRouter.post('/login',
    requiredFields(['email', 'password']),
    validateFields,
    validateEmail,
    hostLogin)

hostRouter.get('/visitors', verifyToken, getAllVisitors)
hostRouter.get('/get-employee/:employeeId', verifyToken, getEmployee)
hostRouter.put('/update-employee', verifyToken, updateEmployee)

module.exports = hostRouter;