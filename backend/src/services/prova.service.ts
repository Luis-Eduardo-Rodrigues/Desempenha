import crypto from "crypto";
import { Prisma } from "../../generated/prisma/client.ts";
import { ProvaRepository } from "../repositories/prova.repository.ts";
import type { Question } from "../types/prova.types.ts";
import { stripCorrectAnswers } from "../utils/grade.ts";

export class ProvaService {
  private repository: ProvaRepository;

  constructor() {
    this.repository = new ProvaRepository();
  }

  async create(
    title: string,
    questions: Prisma.JsonArray,
    professorId: string,
  ) {
    const formCode = crypto.randomUUID();

    return this.repository.create(title, formCode, questions, professorId);
  }

  async findOne(id: string) {
    const prova = await this.repository.findOne(id);

    if (!prova) {
      throw new Error("Prova não encontrada.");
    }

    return prova;
  }

  async findByFormCodePublic(formCode: string) {
    const prova = await this.repository.findByFormCode(formCode);

    if (!prova) {
      throw new Error("Prova não encontrada.");
    }

    const questions = prova.questions as unknown as Question[];

    return {
      id: prova.id,
      title: prova.title,
      formCode: prova.formCode,
      questions: stripCorrectAnswers(questions),
    };
  }

  async findAllByProfessor(professorId: string) {
    return this.repository.findAllByProfessor(professorId);
  }

  async update(id: string, title: string, questions: Prisma.JsonArray) {
    await this.findOne(id);

    return this.repository.update(id, title, questions);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.repository.remove(id);
  }
}
