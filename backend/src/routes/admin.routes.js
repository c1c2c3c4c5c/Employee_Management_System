import express from "express";
import AdminController from "../controllers/admin.controller.js";

const AdminRouter = express.Router();

const admincontroller = new AdminController();

AdminRouter.get('/', admincontroller.getAdminDetails);

AdminRouter.post('/login', admincontroller.login);

AdminRouter.get('/getAttendance', admincontroller.getAttendance);

AdminRouter.post('/markAttendance', admincontroller.markAttendance);

AdminRouter.get('/getBreakLeave', admincontroller.getBreakLeave);

AdminRouter.post('/appproveBreakLeave/:id', admincontroller.approveBreakLeave);

AdminRouter.post('/rejectBreakLeave/:id', admincontroller.rejectBreakLeave);

AdminRouter.get('/getEmployees', admincontroller.getEmployees);

AdminRouter.post('/createEmployee', admincontroller.createEmployee);

AdminRouter.put('/updateEmployee/:id', admincontroller.updateEmployee);

AdminRouter.delete('/deleteEmployee/:id', admincontroller.deleteEmployee);

AdminRouter.get('/getMeetings', admincontroller.getMeetings);

AdminRouter.post('/scheduleMeeting', admincontroller.scheduleMeeting);

AdminRouter.get('/getNewsLetter', admincontroller.getNewsLetters);

AdminRouter.post('/postNewsLetter', admincontroller.postNewsLetter);

AdminRouter.get('/getnotifications', admincontroller.getNotifications);

AdminRouter.post('/createNotification', admincontroller.createNotification);

AdminRouter.delete('/deleteNotification/:id', admincontroller.deleteNotification);

AdminRouter.get('/getReports', admincontroller.getReports);

AdminRouter.post('/createReport', admincontroller.createReport);

AdminRouter.delete('/deleteReport/:id', admincontroller.deleteReport);

AdminRouter.get('/getTasks', admincontroller.getTasks);

AdminRouter.post('/createTask', admincontroller.createTask);

AdminRouter.put('/updateTask/:id', admincontroller.updateTask);

AdminRouter.delete('/deleteTask/:id', admincontroller.deleteTask);






export default AdminRouter;
