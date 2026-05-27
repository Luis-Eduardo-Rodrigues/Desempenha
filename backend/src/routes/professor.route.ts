import express from "express";
import { ProfessorController } from "../controllers/professor.controller.ts";

export const router = express.Router();

const controller = new ProfessorController();

router.get("/professores", controller.getAll.bind(controller));
router.post("/professores", controller.create.bind(controller));
router.get("/professores/:id", controller.findById.bind(controller));
router.put("/professores/:id", controller.update.bind(controller));
router.delete("/professores/:id", controller.remove.bind(controller));
