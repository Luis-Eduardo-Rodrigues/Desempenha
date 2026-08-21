import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfessorAPI } from "../../service/api";

export default function Cadastro() {
  const navigate = useNavigate();

  const api = new ProfessorAPI();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      await api.create(fullName, email, password);

      const loginResponse = await api.login(email, password);

      localStorage.setItem("token", loginResponse.token.token);
      localStorage.setItem("userId", loginResponse.token.user.id);
      localStorage.setItem("userName", loginResponse.token.user.fullName);
      localStorage.setItem("userEmail", loginResponse.token.user.email);

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert("Erro ao criar conta.");
    }
  }

  return (
    <main className="h-screen flex items-center justify-center background-login">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white py-8 px-16 rounded-lg shadow-xl"
      >
        <div>
          <h2 className="text-center font-bold text-2xl">Crie sua conta</h2>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            Nome completo <span className="font-bold text-red-600">*</span>
          </label>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
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

        <div className="flex flex-col gap-2">
          <label>
            Confirmar senha <span className="font-bold text-red-600">*</span>
          </label>

          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#38953e] text-white font-bold text-2xl rounded-md transition hover:cursor-pointer hover:bg-[#347038]"
        >
          Criar conta
        </button>

        <p className="text-center">
          Já tem uma conta?{" "}
          <Link to="/" className="font-bold text-[#38953e]">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}
