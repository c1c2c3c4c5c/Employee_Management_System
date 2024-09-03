const express = require('express');
const router = express.Router();
const jwtAuth = require('../middlewares/jwtAuth.middleware');
const EmployeeController = require('../controllers/employee.controller');

// Employee routes
router.get('/', jwtAuth, EmployeeController.getAllEmployees); // Get all employees
router.get('/:id', jwtAuth, EmployeeController.getEmployeeProfile); // Get a specific employee
router.post('/', jwtAuth, EmployeeController.createEmployee); // Create a new employee
router.put('/:id', jwtAuth, EmployeeController.updateEmployeeProfile); // Update an employee
router.delete('/:id', jwtAuth, EmployeeController.deleteEmployee); // Delete an employee

module.exports = router;
