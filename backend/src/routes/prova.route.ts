import express from "express";
import { ProvaController } from "../controllers/prova.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

export const provaRouter = express.Router();

const controller = new ProvaController();

provaRouter.get(
  "/public/:formCode",
  controller.findByFormCodePublic.bind(controller),
);
provaRouter.post("/", authMiddleware, controller.create.bind(controller));
provaRouter.get(
  "/professor/:professorId",
  authMiddleware,
  controller.findAllByProfessor.bind(controller),
);
provaRouter.get("/:id", authMiddleware, controller.findOne.bind(controller));
provaRouter.put("/:id", authMiddleware, controller.update.bind(controller));
provaRouter.delete("/:id", authMiddleware, controller.remove.bind(controller));
