import { prisma } from "../lib/prisma.ts";

export class AlunoRepository {
  async create(
    fullName: string,
    grade: string,
    registration: string,
    professorId: string,
  ) {
    return prisma.aluno.create({
      data: {
        fullName,
        grade,
        registration,
        professorId,
      },
    });
  }

  async findById(id: string) {
    return prisma.aluno.findUnique({
      where: { id },
    });
  }

  async findByRegistration(registration: string, professorId: string) {
    return prisma.aluno.findFirst({
      where: {
        registration,
        professorId,
      },
    });
  }

  async findAllByProfessor(professorId: string) {
    return prisma.aluno.findMany({
      where: { professorId },
      orderBy: { fullName: "asc" },
    });
  }

  async update(id: string, fullName: string, grade: string) {
    return prisma.aluno.update({
      where: { id },
      data: { fullName, grade },
    });
  }

  async remove(id: string) {
    return prisma.aluno.delete({
      where: { id },
    });
  }
}
