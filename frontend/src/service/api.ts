import axios from "axios";

export type AlternativeKey = "A" | "B" | "C" | "D";

export interface QuestionAlternative {
  key: AlternativeKey;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  alternatives: QuestionAlternative[];
  correctAnswer?: AlternativeKey;
}

export interface Prova {
  id: string;
  title: string;
  formCode: string;
  questions: Question[];
  professorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Aluno {
  id: string;
  fullName: string;
  grade: string;
  registration: string;
  professorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  prova: { id: string; title: string };
  totalSubmissions: number;
  averageGrade: number;
  hardestQuestion: {
    questionId: string;
    text: string;
    errorRate: number;
  } | null;
  easiestQuestion: {
    questionId: string;
    text: string;
    errorRate: number;
  } | null;
  questionStats: {
    questionId: string;
    text: string;
    correctCount: number;
    wrongCount: number;
    errorRate: number;
  }[];
  submissions: {
    id: string;
    alunoName: string;
    registration: string;
    grade: number | null;
    submittedAt: string;
  }[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export class ProfessorAPI {
  async create(fullName: string, email: string, password: string) {
    const response = await api.post("/professores", {
      fullName,
      email,
      password,
    });

    return response.data;
  }

  async login(email: string, password: string) {
    const response = await api.post("/professores/login", {
      email,
      password,
    });

    return response.data;
  }

  async findById(id: string) {
    const response = await api.get(`/professores/${id}`);
    return response.data;
  }

  async update(id: string, fullName: string) {
    const response = await api.put(`/professores/${id}`, { fullName });
    return response.data;
  }

  async remove(id: string) {
    const response = await api.delete(`/professores/${id}`);
    return response.data;
  }
}

export class ProvaAPI {
  async create(title: string, questions: Question[]) {
    const response = await api.post("/provas", { title, questions });
    return response.data;
  }

  async findAllByProfessor(professorId: string) {
    const response = await api.get(`/provas/professor/${professorId}`);
    return response.data;
  }

  async findByFormCode(formCode: string) {
    const response = await api.get(`/provas/public/${formCode}`);
    return response.data;
  }

  async update(id: string, title: string, questions: Question[]) {
    const response = await api.put(`/provas/${id}`, { title, questions });
    return response.data;
  }

  async remove(id: string) {
    const response = await api.delete(`/provas/${id}`);
    return response.data;
  }
}

export class AlunoAPI {
  async create(fullName: string, grade: string, registration: string) {
    const response = await api.post("/alunos", {
      fullName,
      grade,
      registration,
    });

    return response.data;
  }

  async findAllByProfessor(professorId: string) {
    const response = await api.get(`/alunos/professor/${professorId}`);
    return response.data;
  }

  async update(id: string, fullName: string, grade: string) {
    const response = await api.put(`/alunos/${id}`, { fullName, grade });
    return response.data;
  }

  async remove(id: string) {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
  }
}

export class RespostaAPI {
  async submit(
    formCode: string,
    registration: string,
    answers: Record<string, AlternativeKey>,
  ) {
    const response = await api.post("/respostas/submit", {
      formCode,
      registration,
      answers,
    });

    return response.data;
  }

  async getAnalytics(provaId: string) {
    const response = await api.get(`/respostas/prova/${provaId}/analytics`);
    return response.data;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}
