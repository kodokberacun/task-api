import { prisma } from "../db";
import { TaskStatus } from "@prisma/client";

export async function listTasks(status?: TaskStatus) {
  return prisma.task.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export async function createTask(data: { title: string; description?: string }) {
  return prisma.task.create({ data });
}

export async function updateTask(
  id: string,
  data: { title?: string; description?: string; status?: TaskStatus }
) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({
    where: { id },
  });
}