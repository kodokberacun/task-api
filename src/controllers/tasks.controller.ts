import { Request, Response } from "express";
import * as taskService from "../services/tasks.service";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator";
import { TaskStatus } from "@prisma/client";

export async function list(req: Request, res: Response) {
  const status = req.query.status as TaskStatus | undefined;

  if (status && !["PENDING", "IN_PROGRESS", "DONE"].includes(status)) {
    return res.status(400).json({ error: "Invalid status filter" });
  }

  const tasks = await taskService.listTasks(status);
  return res.json(tasks);
}

export async function get(req: Request, res: Response) {
  const id = req.params.id as string;

  const task = await taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.json(task);
}

export async function create(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation error",
      details: parsed.error.flatten(),
    });
  }

  const task = await taskService.createTask(parsed.data);
  return res.status(201).json(task);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;

  const parsed = updateTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation error",
      details: parsed.error.flatten(),
    });
  }

  const existing = await taskService.getTaskById(id);

  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updated = await taskService.updateTask(id, parsed.data);
  return res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;

  const existing = await taskService.getTaskById(id);

  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  await taskService.deleteTask(id);
  return res.status(204).send();
}