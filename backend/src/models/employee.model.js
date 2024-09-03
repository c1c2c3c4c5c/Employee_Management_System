import mongoose from "mongoose";

export const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    department: { type: String }
});

export const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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

export const BreakLeaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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

export const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    dueDate: { type: String }
});
