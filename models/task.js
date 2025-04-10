const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",            // 🔗 Link to the User model
    required: true,         // ✅ Every task must belong to a user
  },



}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
