import type { Request, Response } from "express";
import { ProvaService } from "../services/prova.service.ts";
import { provaSchema } from "../schemas/request.schemas.ts";

export class ProvaController {
  private service: ProvaService;

  constructor() {
    this.service = new ProvaService();
  }

  async create(req: Request, res: Response) {
    try {
      const { title, questions } = provaSchema.parse(req.body);
      const professorId = req.user!.id;

      const prova = await this.service.create(title, questions, professorId);

      return res.status(201).json({
        message: "Prova criada com sucesso!",
        data: prova,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao criar prova.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prova = await this.service.findOne(id as string);

      if (req.user!.id !== prova.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      return res.status(200).json({
        message: "Prova encontrada com sucesso!",
        data: prova,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Prova não encontrada.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async findByFormCodePublic(req: Request, res: Response) {
    try {
      const { formCode } = req.params;
      const prova = await this.service.findByFormCodePublic(formCode as string);

      return res.status(200).json({
        message: "Prova encontrada com sucesso!",
        data: prova,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Prova não encontrada.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async findAllByProfessor(req: Request, res: Response) {
    try {
      const { professorId } = req.params;

      if (req.user!.id !== professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const provas = await this.service.findAllByProfessor(professorId);

      return res.status(200).json({
        message: "Provas encontradas com sucesso!",
        data: provas,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar provas.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, questions } = provaSchema.parse(req.body);

      const prova = await this.service.findOne(id as string);

      if (req.user!.id !== prova.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const updated = await this.service.update(
        id as string,
        title,
        questions,
      );

      return res.status(200).json({
        message: "Prova atualizada com sucesso!",
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar prova.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prova = await this.service.findOne(id as string);

      if (req.user!.id !== prova.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      await this.service.remove(id as string);

      return res.status(200).json({
        message: "Prova removida com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao remover prova.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
