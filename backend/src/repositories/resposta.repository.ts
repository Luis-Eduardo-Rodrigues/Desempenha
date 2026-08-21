import { Prisma } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

export class RespostaRepository {
  async create(
    alunoId: string,
    provaId: string,
    answers: Prisma.JsonObject,
    grade: number,
  ) {
    return prisma.resposta.create({
      data: {
        alunoId,
        provaId,
        answers,
        grade,
      },
      include: {
        aluno: true,
      },
    });
  }

  async findByAlunoAndProva(alunoId: string, provaId: string) {
    return prisma.resposta.findUnique({
      where: {
        alunoId_provaId: {
          alunoId,
          provaId,
        },
      },
    });
  }

  async findAllByProva(provaId: string) {
    return prisma.resposta.findMany({
      where: { provaId },
      include: {
        aluno: true,
      },
      orderBy: { submittedAt: "desc" },
    });
  }
}
