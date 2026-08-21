import { Prisma } from "../../generated/prisma/client.ts";
import { AlunoRepository } from "../repositories/aluno.repository.ts";
import { ProvaRepository } from "../repositories/prova.repository.ts";
import { RespostaRepository } from "../repositories/resposta.repository.ts";
import type { Question, StudentAnswers } from "../types/prova.types.ts";
import { calculateGrade } from "../utils/grade.ts";

export class RespostaService {
  private respostaRepository: RespostaRepository;
  private provaRepository: ProvaRepository;
  private alunoRepository: AlunoRepository;

  constructor() {
    this.respostaRepository = new RespostaRepository();
    this.provaRepository = new ProvaRepository();
    this.alunoRepository = new AlunoRepository();
  }

  async submit(formCode: string, registration: string, answers: StudentAnswers) {
    const prova = await this.provaRepository.findByFormCode(formCode);

    if (!prova) {
      throw new Error("Prova não encontrada.");
    }

    const aluno = await this.alunoRepository.findByRegistration(
      registration,
      prova.professorId,
    );

    if (!aluno) {
      throw new Error("Matrícula não encontrada para esta prova.");
    }

    const existing = await this.respostaRepository.findByAlunoAndProva(
      aluno.id,
      prova.id,
    );

    if (existing) {
      throw new Error("Esta matrícula já respondeu esta prova.");
    }

    const questions = prova.questions as unknown as Question[];
    const grade = calculateGrade(questions, answers);

    const resposta = await this.respostaRepository.create(
      aluno.id,
      prova.id,
      answers as unknown as Prisma.JsonObject,
      grade,
    );

    return {
      grade,
      alunoName: aluno.fullName,
      provaTitle: prova.title,
      submittedAt: resposta.submittedAt,
    };
  }

  async findAllByProva(provaId: string) {
    return this.respostaRepository.findAllByProva(provaId);
  }

  async getAnalytics(provaId: string) {
    const prova = await this.provaRepository.findOne(provaId);

    if (!prova) {
      throw new Error("Prova não encontrada.");
    }

    const respostas = await this.respostaRepository.findAllByProva(provaId);
    const questions = prova.questions as unknown as Question[];

    const questionStats = questions.map((question) => {
      const wrongCount = respostas.filter(
        (resposta) => {
          const answers = resposta.answers as StudentAnswers;
          return answers[question.id] !== question.correctAnswer;
        },
      ).length;

      const correctCount = respostas.length - wrongCount;

      return {
        questionId: question.id,
        text: question.text,
        correctCount,
        wrongCount,
        errorRate:
          respostas.length > 0
            ? Number(((wrongCount / respostas.length) * 100).toFixed(1))
            : 0,
      };
    });

    const averageGrade =
      respostas.length > 0
        ? Number(
            (
              respostas.reduce((sum, item) => sum + (item.grade ?? 0), 0) /
              respostas.length
            ).toFixed(2),
          )
        : 0;

    const hardestQuestion = [...questionStats].sort(
      (a, b) => b.errorRate - a.errorRate,
    )[0];

    const easiestQuestion = [...questionStats].sort(
      (a, b) => a.errorRate - b.errorRate,
    )[0];

    return {
      prova: {
        id: prova.id,
        title: prova.title,
      },
      totalSubmissions: respostas.length,
      averageGrade,
      hardestQuestion: hardestQuestion ?? null,
      easiestQuestion: easiestQuestion ?? null,
      questionStats,
      submissions: respostas.map((resposta) => ({
        id: resposta.id,
        alunoName: resposta.aluno.fullName,
        registration: resposta.aluno.registration,
        grade: resposta.grade,
        submittedAt: resposta.submittedAt,
      })),
    };
  }
}
