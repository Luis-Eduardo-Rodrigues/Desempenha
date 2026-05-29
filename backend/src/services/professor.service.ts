import { ProfessorRepository } from "../repositories/professor.repository.ts";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

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

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Esse professor não está cadastrado!");
    }

    const comparePw = await bcrypt.compare(password, user.passwordHash);

    if (!comparePw) {
      throw new Error("Senha incorreta!");
    }

    const secret = process.env.SECRET_JWT;

    if (!secret) {
      throw new Error("JWT Secret não definida.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1h",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    };
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
