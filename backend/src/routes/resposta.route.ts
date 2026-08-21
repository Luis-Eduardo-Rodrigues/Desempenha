import express from "express";
import { RespostaController } from "../controllers/resposta.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

export const respostaRouter = express.Router();

const controller = new RespostaController();

respostaRouter.post("/submit", controller.submit.bind(controller));
respostaRouter.get(
  "/prova/:provaId",
  authMiddleware,
  controller.findAllByProva.bind(controller),
);
respostaRouter.get(
  "/prova/:provaId/analytics",
  authMiddleware,
  controller.getAnalytics.bind(controller),
);
