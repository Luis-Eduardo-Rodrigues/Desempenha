import express from "express";
import { ProfessorController } from "../controllers/professor.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

export const router = express.Router();

const controller = new ProfessorController();

router.get("/professores", controller.getAll.bind(controller));

router.post("/professores", controller.create.bind(controller));
router.post("/professores/login", controller.login.bind(controller));

router.get(
  "/professores/:id",
  authMiddleware,
  controller.findById.bind(controller),
);
router.put(
  "/professores/:id",
  authMiddleware,
  controller.update.bind(controller),
);
router.delete(
  "/professores/:id",
  authMiddleware,
  controller.remove.bind(controller),
);
