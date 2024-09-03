import mongoose from "mongoose";

export const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    present: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
    },
});

export const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    department: { type: String }
});

export const meetingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
    }],
    description: {
        type: String,
        required: true,
    },
});

export const NewsLetterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

export const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

export const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

export const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    dueDate: { type: String }
});

export const BreakLeaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
});
