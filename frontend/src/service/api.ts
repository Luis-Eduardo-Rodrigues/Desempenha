import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
}
