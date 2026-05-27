import { prisma } from "../lib/prisma.ts";

export class ProfessorRepository {
  async getAll() {
    return prisma.professor.findMany();
  }

  async findById(id: string) {
    return prisma.professor.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.professor.findUnique({
      where: {
        email,
      },
    });
  }

  async create(fullName: string, email: string, passwordHash: string) {
    return prisma.professor.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });
  }

  async update(id: string, fullName: string) {
    return prisma.professor.update({
      where: {
        id,
      },
      data: {
        fullName,
      },
    });
  }

  async remove(id: string) {
    return prisma.professor.delete({
      where: {
        id,
      },
    });
  }
}
