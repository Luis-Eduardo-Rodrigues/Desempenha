import { prisma } from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";

export class ProvaRepository {
  async create(
    title: string,
    formCode: string,
    questions: Prisma.JsonArray,
    professorId: string,
  ) {
    return prisma.prova.create({
      data: {
        title,
        formCode,
        questions,
        professorId,
      },
    });
  }

  async findOne(id: string) {
    return prisma.prova.findUnique({
      where: {
        id,
      },
    });
  }

  async findByFormCode(formCode: string) {
    return prisma.prova.findUnique({
      where: {
        formCode,
      },
    });
  }

  async findAllByProfessor(professorId: string) {
    return prisma.prova.findMany({
      where: {
        professorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, title: string, questions: Prisma.JsonArray) {
    return prisma.prova.update({
      where: {
        id,
      },
      data: {
        title,
        questions,
      },
    });
  }

  async remove(id: string) {
    return prisma.prova.delete({
      where: {
        id,
      },
    });
  }
}
