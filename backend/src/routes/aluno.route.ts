import express from "express";
import { AlunoController } from "../controllers/aluno.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

export const alunoRouter = express.Router();

const controller = new AlunoController();

alunoRouter.post("/", authMiddleware, controller.create.bind(controller));
alunoRouter.get(
  "/professor/:professorId",
  authMiddleware,
  controller.findAllByProfessor.bind(controller),
);
alunoRouter.put("/:id", authMiddleware, controller.update.bind(controller));
alunoRouter.delete("/:id", authMiddleware, controller.remove.bind(controller));
