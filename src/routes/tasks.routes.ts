import { Router } from "express";
import * as controller from "../controllers/tasks.controller";

export const tasksRouter = Router();

tasksRouter.get("/", controller.list);
tasksRouter.get("/:id", controller.get);
tasksRouter.post("/", controller.create);
tasksRouter.put("/:id", controller.update);
tasksRouter.delete("/:id", controller.remove);