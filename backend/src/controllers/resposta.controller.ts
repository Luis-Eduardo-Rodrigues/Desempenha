import type { Request, Response } from "express";
import { ProvaService } from "../services/prova.service.ts";
import { RespostaService } from "../services/resposta.service.ts";
import { respostaSchema } from "../schemas/request.schemas.ts";

export class RespostaController {
  private service: RespostaService;
  private provaService: ProvaService;

  constructor() {
    this.service = new RespostaService();
    this.provaService = new ProvaService();
  }

  async submit(req: Request, res: Response) {
    try {
      const { formCode, registration, answers } = respostaSchema.parse(req.body);

      const result = await this.service.submit(formCode, registration, answers);

      return res.status(201).json({
        message: "Prova enviada com sucesso!",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao enviar prova.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async findAllByProva(req: Request, res: Response) {
    try {
      const { provaId } = req.params;
      const prova = await this.provaService.findOne(provaId as string);

      if (req.user!.id !== prova.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const respostas = await this.service.findAllByProva(provaId as string);

      return res.status(200).json({
        message: "Respostas encontradas com sucesso!",
        data: respostas,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao buscar respostas.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async getAnalytics(req: Request, res: Response) {
    try {
      const { provaId } = req.params;
      const prova = await this.provaService.findOne(provaId as string);

      if (req.user!.id !== prova.professorId) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const analytics = await this.service.getAnalytics(provaId as string);

      return res.status(200).json({
        message: "Análises geradas com sucesso!",
        data: analytics,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao gerar análises.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
