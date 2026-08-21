import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ProfessorAPI } from "../../service/api";

export default function Login() {
  const navigate = useNavigate();

  const api = new ProfessorAPI();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await api.login(email, password);

      localStorage.setItem("token", response.token.token);
      localStorage.setItem("userId", response.token.user.id);
      localStorage.setItem("userName", response.token.user.fullName);
      localStorage.setItem("userEmail", response.token.user.email);

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert("Email ou senha inválidos.");
    }
  }

  return (
    <main className="h-screen flex items-center justify-center background-login">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 bg-white py-8 px-16 rounded-lg shadow-xl"
      >
        <div>
          <h2 className="text-center font-bold text-2xl">Login</h2>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            Email <span className="font-bold text-red-600">*</span>
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>
            Senha <span className="font-bold text-red-600">*</span>
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#38953e] text-white font-bold text-2xl rounded-md transition hover:cursor-pointer hover:bg-[#347038]"
        >
          Entrar
        </button>

        <p className="text-center">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-bold text-[#38953e]">
            Criar conta
          </Link>
        </p>
      </form>
    </main>
  );
}
