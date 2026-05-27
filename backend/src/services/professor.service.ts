import { ProfessorRepository } from "../repositories/professor.repository.ts";
import bcrypt from "bcrypt";

export class ProfessorService {
  private repository: ProfessorRepository;

  constructor() {
    this.repository = new ProfessorRepository();
  }

  async getAll() {
    return this.repository.getAll();
  }

  async findById(id: string) {
    const professor = await this.repository.findById(id);

    if (!professor) {
      throw new Error("Nenhum professor encontrado!");
    }

    return professor;
  }

  async create(fullName: string, email: string, password: string) {
    const emailsExists = await this.repository.findByEmail(email);

    if (emailsExists) {
      throw new Error("Email já cadastrado!");
    }

    const pwHash = await bcrypt.hash(password, 10);
    const professor = await this.repository.create(fullName, email, pwHash);

    return professor;
  }

  async update(id: string, fullName: string) {
    await this.findById(id);

    return this.repository.update(id, fullName);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.repository.remove(id);
  }
}
