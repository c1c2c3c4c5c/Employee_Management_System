import mongoose from "mongoose";
import { AttendanceSchema, BreakLeaveSchema, EmployeeSchema, NewsLetterSchema, TaskSchema, meetingSchema, notificationSchema, reportSchema } from "../routes/admin.schema.js";
import { ObjectId } from "mongodb";

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

const MeetingModel = mongoose.model('Meeting', meetingSchema);

const newsletterModel = mongoose.model('NewsLetter', NewsLetterSchema);

const reportModel = mongoose.model('Report', reportSchema);

const notificationModel = mongoose.model('Notification', notificationSchema);

const taskModel = mongoose.model('Task', TaskSchema);

const breakModel = mongoose.model('BreakLeave', BreakLeaveSchema);

export default class AdminController {
    async getAdminDetails(req, res) {

    }

    async login(req, res) {
        //send the otp to the mail and confirm the employee.
        const { email } = req.body;
        //pending
    }

    async getAttendance(req, res) {
        try {
            const attendance = await AttendanceModel.find();
            return res.status(200).send(attendance);

        } catch (err) {
            res.status(500).send('Server Error');
        }
    }

    async markAttendance(req, res) {
        const { employeeId, date, present, location } = req.body;
        try {
            const newAttendance = new AttendanceModel({
                employeeId: new ObjectId(employeeId), date, present, location
            });

            const attendance = await newAttendance.save();
            res.status(201).send(attendance);
        } catch (err) {
            res.status(500).send('Server Error');
        }

    }

    async getBreakLeave(req, res) {
        try {
            const breakLeaves = await breakModel.find();
            res.json(breakLeaves);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }

    async approveBreakLeave(req, res) {
        try {
            const breakLeave = await breakModel.findById(req.params.id);
            breakLeave.status = 'approved';
            await breakLeave.save();
            res.json(breakLeave);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    }

    async rejectBreakLeave(req, res) {

        try {
            const breakLeave = await breakModel.findById(req.params.id);
            breakLeave.status = 'rejected';
            await breakLeave.save();
            res.json(breakLeave);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }

    async getEmployees(req, res) {
        const employees = await EmployeeModel.find();
        return res.status(200).send(employees);
    }

    async createEmployee(req, res) {
        const { name, email, position, department } = req.body;
        //console.log(name,email,position,department);
        try {
            const employee = new EmployeeModel({
                name, email, position, department
            });
            await employee.save();
            //console.log(employee);
            return res.status(201).send(employee);

        } catch (err) {
            return res.status(400).send(err)
        }
    }

    async updateEmployee(req, res) {
        const { name, email, position, department } = req.body;
        const { id } = req.params;
        try {
            let employee = await EmployeeModel.findById(id);
            if (employee) {
                employee = await EmployeeModel.findByIdAndUpdate(
                    id,
                    { $set: { name, email, position, department } },
                    { new: true }
                );
                return res.json(employee);
            }
        } catch (err) {
            return res.status(400).send(err);
        }

    }

    async deleteEmployee(req, res) {
        const { id } = req.params;
        try {
            await EmployeeModel.findByIdAndDelete(id);
            return res.status(200).send("employee removed");

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async getMeetings(req, res) {
        const meetings = await MeetingModel.find();
        return res.status(200).send(meetings);

    }

    async scheduleMeeting(req, res) {
        const { date, time, attendees, description } = req.body;
        const attendee = attendees.split(',')
        try {
            const newMeeting = new MeetingModel({
                date,
                time,
                attendees: attendee,
                description,
            });

            const meeting = await newMeeting.save();
            res.json(meeting);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }

    async getNewsLetters(req, res) {
        const newsletters = await newsletterModel.find().sort({ date: -1 });
        return res.status(200).send(newsletters);

    }

    async postNewsLetter(req, res) {
        const { title, content } = req.body;
        try {
            const newNewsletter = new newsletterModel({
                title,
                content,
                postedBy: "Admin",
            });

            const newsletter = await newNewsletter.save();
            res.json(newsletter);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }

    async getNotifications(req, res) {
        try {
            const notifications = await notificationModel.find().sort({ date: -1 });
            res.json(notifications);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async createNotification(req, res) {
        const { message, recipient } = req.body;

        try {
            const notification = new notificationModel({ message, recipient });
            await notification.save();
            res.json(notification);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async deleteNotification(req, res) {
        const { id } = req.params;

        try {
            await notificationModel.findByIdAndDelete(id);
            res.json({ msg: 'Notification removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }


    }

    async getReports(req, res) {
        try {
            const reports = await reportModel.find().sort({ date: -1 });
            res.json(reports);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async createReport(req, res) {
        const { title, description, reportedBy } = req.body;

        try {
            const report = new reportModel({ title, description, reportedBy });
            await report.save();
            res.json(report);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async deleteReport(req, res) {
        const { id } = req.params;

        try {
            await reportModel.findByIdAndDelete(id);
            res.json({ msg: 'Report removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }


    async getTasks(req, res) {
        try {
            const tasks = await taskModel.find().populate('assignedTo', 'name');
            res.json(tasks);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }

    async createTask(req, res) {
        const { title, description, assignedTo, dueDate } = req.body;

        try {
            const task = new taskModel({ title, description, assignedTo, dueDate });
            await task.save();
            res.json(task);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async updateTask(req, res) {
        const { title, description, status, assignedTo, dueDate } = req.body;
        const { id } = req.params;

        try {
            let task = await taskModel.findById(id);

            if (task) {
                task = await taskModel.findByIdAndUpdate(
                    id,
                    { $set: { title, description, status, assignedTo, dueDate } },
                    { new: true }
                );
                return res.json(task);
            }

            res.status(404).json({ msg: 'Task not found' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }

    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            await taskModel.findByIdAndDelete(id);
            res.json({ msg: 'Task removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
}