// 1. Load environment variables
require("dotenv").config();

// 2. Import packages
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const User = require("./models/user");
const taskSchema = require("./validation/taskValidation");
const authenticateToken = require("./middleware/auth"); // ✅ Import JWT middleware

// 3. Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Middleware
app.use(express.json());
app.use(express.static("public"));

// 5. Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectToDB();

// 6. Routes

// 🟢 Register (Public)
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// 🟢 Login (Public)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// 🛡️ All the routes below require authentication
// ✅ Create Task
app.post("/api/tasks", authenticateToken, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed,
      user: req.user.userId, // ✅ Attach logged-in user's ID

    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✅ Get All Tasks
app.get("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); // ✅ Filter by user
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ Get One Task
app.get("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to get task" });
  }
});

// ✅ Update Task
app.put("/api/tasks/:id", authenticateToken, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ Delete One Task
app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});
// ✅ Delete All Tasks
app.delete("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const result = await Task.deleteMany({ user: req.user.userId });
    res.status(200).json({ message: `All ${result.deletedCount} tasks deleted` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete all tasks" });
  }
});



// ✅ Add this here (BEFORE app.listen)
app.get("/", (req, res) => {
  res.send("Home page is working!");
});
// 7. Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
