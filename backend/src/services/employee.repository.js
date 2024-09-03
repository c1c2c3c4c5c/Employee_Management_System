import express from "express";
import EmployeeController from "../controllers/employee.controller.js";

const EmployeeRouter = express.Router();
const employeeController = new EmployeeController();

EmployeeRouter.get('/profile/:id', employeeController.getEmployeeProfile);
EmployeeRouter.put('/profile/:id', employeeController.updateEmployeeProfile);

EmployeeRouter.get('/attendance/:employeeId', employeeController.getAttendance);
EmployeeRouter.post('/attendance', employeeController.markAttendance);

EmployeeRouter.get('/breakLeaves/:employeeId', employeeController.getBreakLeaves);
EmployeeRouter.post('/breakLeave', employeeController.requestBreakLeave);

EmployeeRouter.get('/tasks/:employeeId', employeeController.getTasks);
EmployeeRouter.put('/task/:id/status', employeeController.updateTaskStatus);

export default EmployeeRouter;
