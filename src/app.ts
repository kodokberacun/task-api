import express from "express";
import { tasksRouter } from "./routes/tasks.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/tasks", tasksRouter);

app.use(errorMiddleware);