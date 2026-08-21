import { AlunoRepository } from "../repositories/aluno.repository.ts";

export class AlunoService {
  private repository: AlunoRepository;

  constructor() {
    this.repository = new AlunoRepository();
  }

  async create(
    fullName: string,
    grade: string,
    registration: string,
    professorId: string,
  ) {
    const existing = await this.repository.findByRegistration(
      registration,
      professorId,
    );

    if (existing) {
      throw new Error("Matrícula já cadastrada para este professor.");
    }

    return this.repository.create(fullName, grade, registration, professorId);
  }

  async findById(id: string) {
    const aluno = await this.repository.findById(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado.");
    }

    return aluno;
  }

  async findAllByProfessor(professorId: string) {
    return this.repository.findAllByProfessor(professorId);
  }

  async update(id: string, fullName: string, grade: string) {
    await this.findById(id);

    return this.repository.update(id, fullName, grade);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.repository.remove(id);
  }
}
