import type { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service.ts";
import {
  loginSchema,
  professorSchema,
  professorUpdateSchema,
} from "../schemas/request.schemas.ts";

export class ProfessorController {
  private service: ProfessorService;

  constructor() {
    this.service = new ProfessorService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const professors = await this.service.getAll();

      return res.status(200).json({
        message: "Professores encontrados com sucesso!",
        data: professors,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar professores.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (req.user!.id !== id) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const professor = await this.service.findById(id as string);

      return res.status(200).json({
        message: "Professor encontrado com sucesso!",
        data: professor,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Professor não encontrado.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { fullName, email, password } = professorSchema.parse(req.body);

      const professor = await this.service.create(fullName, email, password);

      return res.status(201).json({
        message: "Professor criado com sucesso!",
        data: professor,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        message: "Erro ao criar professor.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const token = await this.service.login(email, password);

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao fazer login.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fullName } = professorUpdateSchema.parse(req.body);

      if (req.user!.id !== id) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const updatedProfessor = await this.service.update(
        id as string,
        fullName,
      );

      return res.status(200).json({
        message: "Professor atualizado com sucesso!",
        data: updatedProfessor,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar professor.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (req.user!.id !== id) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      await this.service.remove(id as string);

      return res.status(200).json({
        message: "Professor removido com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao remover professor.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
