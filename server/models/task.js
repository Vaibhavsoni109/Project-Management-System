import mongoose, { Schema } from "mongoose";

const taskShema = new Schema({
    title: { type: String, Required: true },
    date: { type: Date, default: new Date() },
    priority: { type: String, enum: ["high", "medium", "normal", "low"], default: "normal" },
    stage: { type: String, enum: ["todo", "in progress", "completed"], default: "todo" },
    activities: [
        {
          type: {
            type: String,
            default: "assigned",
            enum: [
              "assigned",
              "started",
              "in progress",
              "bug",
              "completed",
              "commented",
            ],
          },
          activity: String,
          date: { type: Date, default: new Date() },
          by: { type: Schema.Types.ObjectId, ref: "User" },
        },
      ],
  
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