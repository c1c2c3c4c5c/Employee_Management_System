import mongoose from "mongoose";
import { EmployeeSchema, AttendanceSchema, BreakLeaveSchema, TaskSchema } from "../routes/employee.schema.js";
import { ObjectId } from "mongodb";

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);
const BreakLeaveModel = mongoose.model('BreakLeave', BreakLeaveSchema);
const TaskModel = mongoose.model('Task', TaskSchema);

export default class EmployeeController {
    // Get employee profile details
    async getEmployeeProfile(req, res) {
        const { id } = req.params;
        try {
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send(employee);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Update employee profile
    async updateEmployeeProfile(req, res) {
        const { id } = req.params;
        const { name, email, position, department } = req.body;
        try {
            const employee = await EmployeeModel.findByIdAndUpdate(
                id,
                { name, email, position, department },
                { new: true }
            );
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send(employee);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Get attendance records
    async getAttendance(req, res) {
        const { employeeId } = req.params;
        try {
            const attendance = await AttendanceModel.find({ employeeId: new ObjectId(employeeId) });
            res.status(200).send(attendance);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Mark attendance
    async markAttendance(req, res) {
        const { employeeId, date, present, location } = req.body;
        try {
            const newAttendance = new AttendanceModel({
                employeeId: new ObjectId(employeeId),
                date,
                present,
                location
            });
            const attendance = await newAttendance.save();
            res.status(201).send(attendance);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Get break/leave records
    async getBreakLeaves(req, res) {
        const { employeeId } = req.params;
        try {
            const breakLeaves = await BreakLeaveModel.find({ employeeId: new ObjectId(employeeId) });
            res.status(200).send(breakLeaves);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Request a break/leave
    async requestBreakLeave(req, res) {
        const { employeeId, reason, duration } = req.body;
        try {
            const newBreakLeave = new BreakLeaveModel({
                employeeId: new ObjectId(employeeId),
                reason,
                duration
            });
            const breakLeave = await newBreakLeave.save();
            res.status(201).send(breakLeave);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Get assigned tasks
    async getTasks(req, res) {
        const { employeeId } = req.params;
        try {
            const tasks = await TaskModel.find({ assignedTo: new ObjectId(employeeId) });
            res.status(200).send(tasks);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    // Update task status
    async updateTaskStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const task = await TaskModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!task) {
                return res.status(404).send('Task not found');
            }
            res.status(200).send(task);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }
}
