const { getEmployeesName } = require('../controllers/employeeController');
const { visitorLogin, visitorLogout } = require('../controllers/visitorController');
const { requiredFields } = require('../middlewares/requiredFields');
const { validateFields } = require('../middlewares/validateFields');
const { validateEmail } = require('../middlewares/validInputCheck');
const visitorRouter = require('express').Router();

visitorRouter.post("/login",
    requiredFields(['firstName',
        'lastName',
        'email',
        'company',
        'phone',
        'profession',
        'hostId']),
    validateFields,
    validateEmail,
    visitorLogin);

visitorRouter.patch('/logout/:visitorId', visitorLogout)
visitorRouter.get('/hostNames', getEmployeesName)

module.exports = visitorRouter;