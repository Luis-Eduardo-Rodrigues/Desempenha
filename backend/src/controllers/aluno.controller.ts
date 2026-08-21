import type { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service.ts";
import {
  alunoSchema,
  alunoUpdateSchema,
} from "../schemas/request.schemas.ts";

export class AlunoController {
  private service: AlunoService;

  constructor() {
    this.service = new AlunoService();
  }

  async create(req: Request, res: Response) {
    try {
      const { fullName, grade, registration } = alunoSchema.parse(req.body);
      const professorId = req.user!.id;

      const aluno = await this.service.create(
        fullName,
        grade,
        registration,
        professorId,
      );

      return res.status(201).json({
        message: "Aluno criado com sucesso!",
        data: aluno,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao criar aluno.",
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

      const alunos = await this.service.findAllByProfessor(professorId);

      return res.status(200).json({
        message: "Alunos encontrados com sucesso!",
        data: alunos,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar alunos.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fullName, grade } = alunoUpdateSchema.parse(req.body);

      const aluno = await this.service.findById(id as string);

      if (req.user!.id !== aluno.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const updated = await this.service.update(
        id as string,
        fullName,
        grade,
      );

      return res.status(200).json({
        message: "Aluno atualizado com sucesso!",
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar aluno.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const aluno = await this.service.findById(id as string);

      if (req.user!.id !== aluno.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      await this.service.remove(id as string);

      return res.status(200).json({
        message: "Aluno removido com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao remover aluno.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
