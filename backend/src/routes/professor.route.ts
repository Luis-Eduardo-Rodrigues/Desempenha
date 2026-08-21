import express from "express";
import { ProfessorController } from "../controllers/professor.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

export const professorRouter = express.Router();

const controller = new ProfessorController();

professorRouter.get("/professores", controller.getAll.bind(controller));

professorRouter.post("/professores", controller.create.bind(controller));
professorRouter.post("/professores/login", controller.login.bind(controller));

professorRouter.get(
  "/professores/:id",
  authMiddleware,
  controller.findById.bind(controller),
);
professorRouter.put(
  "/professores/:id",
  authMiddleware,
  controller.update.bind(controller),
);
professorRouter.delete(
  "/professores/:id",
  authMiddleware,
  controller.remove.bind(controller),
);
