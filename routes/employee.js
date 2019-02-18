var express = require('express');
var Employee = require('../controllers/employee.js');
var router = express.Router();


router.post('/createEmployeeProfile',Employee.createEmployeeProfile);
router.get('/getEmployeeProfile',Employee.getEmployeeProfile);
router.put('/updateEmployeeProfile',Employee.updateEmployeeProfile);
router.delete('/deleteEmployeeProfile',Employee.deleteEmployeeProfile);
router.post('/getAllEmployeeProfile',Employee.getAllEmployeeProfile);









module.exports = router;
