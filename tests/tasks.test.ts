import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/db";

describe("Tasks API", () => {
  beforeAll(async () => {
    await prisma.task.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("POST /tasks should create a task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "Testing create endpoint",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Task");
  });

  test("PUT /tasks/:id should update task status", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Update Task",
        description: "Before update",
      },
    });

    const res = await request(app).put(`/tasks/${task.id}`).send({
      status: "DONE",
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("DONE");
  });

  test("DELETE /tasks/:id should delete task", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Delete Task",
      },
    });

    const res = await request(app).delete(`/tasks/${task.id}`);

    expect(res.status).toBe(204);

    const deleted = await prisma.task.findUnique({
      where: { id: task.id },
    });

    expect(deleted).toBeNull();
  });
});