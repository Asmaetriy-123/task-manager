const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../server");
const Task = require("../models/task");

let createdTaskId; // Store task ID for individual task tests

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Task API", () => {
  it("POST /api/tasks - should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Test Task");

    createdTaskId = response.body._id;
  });

  it("GET /api/tasks - should return an array of tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /api/tasks/:id - should return a task by ID", async () => {
    const response = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(createdTaskId);
  });

  it("PUT /api/tasks/:id - should update the task", async () => {
    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ title: "Updated Task", completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.completed).toBe(true);
  });

  it("DELETE /api/tasks/:id - should delete a task by ID", async () => {
    const response = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });

  it("DELETE /api/tasks - should delete all tasks", async () => {
    await Task.create({ title: "Temp Task 1" });
    await Task.create({ title: "Temp Task 2" });

    const response = await request(app).delete("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/All \d+ tasks deleted/);
  });
});
