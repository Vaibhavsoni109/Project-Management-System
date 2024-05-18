import mongoose, { Schema } from "mongoose";

const taskShema = new Schema({
    title: { type: String, Required: true },
    date: { type: Date, default: new Date() },
    priority: { type: String, enum: ["high", "medium", "normal", "low"], default: "normal" },
    Stage: { type: String, enum: ["todo", "In Progress", "completed"], default: "todo" },
    activities: { type: String, enum: ["assigned", "started", "In Progress", "bug", "completed", "commented"], default: "assigned" },
    activity: {
        type: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
    },
    subTasks: [{
        title: String,
        date: Date,
        tag: String,
    }
        ,
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false }

}, { timestamps: true }
)
const Task=mongoose.model("Task",taskShema);
export default Task;