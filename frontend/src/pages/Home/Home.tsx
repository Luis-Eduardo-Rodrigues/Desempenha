import {
  ChartNoAxesCombined,
  GraduationCap,
  LogOut,
  NotepadText,
  Plus,
  Settings,
  User,
} from "lucide-react";

import { useState } from "react";
import NovaProva from "../../components/NovaProva";
import NovoAluno from "../../components/NovoAluno";
import Configuracoes from "../../components/Configuracoes";
import MinhasProvas from "../../components/Provas";
import Analises from "../../components/Analises";
import Unauthorized from "../Unauthorized/Unauthorized";

export default function Home() {
  const [paginaSelecionada, setPaginaSelecionada] = useState("criar-prova");
  const token = window.localStorage.getItem("token");

  if (!token) {
    return <Unauthorized />;
  }

  function renderizarPagina() {
    switch (paginaSelecionada) {
      case "minhas-provas":
        return <MinhasProvas />;

      case "criar-prova":
        return <NovaProva />;

      case "analises":
        return <Analises />;

      case "alunos":
        return <NovoAluno />;

      case "configuracoes":
        return <Configuracoes />;

      default:
        return <NovaProva />;
    }
  }

  function menuClass(nomePagina) {
    return `
      p-4 
      text-lg 
      font-medium 
      flex 
      items-center 
      gap-3 
      transition 
      hover:cursor-pointer 
      hover:bg-white/10
      ${
        paginaSelecionada === nomePagina
          ? "bg-white/10 border-r-4 border-white"
          : ""
      }
    `;
  }

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <aside className="w-70 h-screen bg-green-600 text-white flex flex-col gap-8 py-8 relative shadow-xl">
        <div className="flex items-center justify-center gap-2">
          <GraduationCap className="w-16 h-16 rounded-md" />

          <h2 className="font-bold text-2xl">Desempenha</h2>
        </div>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => setPaginaSelecionada("minhas-provas")}
            className={menuClass("minhas-provas")}
          >
            <NotepadText />
            Minhas Provas
          </button>

          <button
            onClick={() => setPaginaSelecionada("analises")}
            className={menuClass("analises")}
          >
            <ChartNoAxesCombined />
            Análises
          </button>

          <button
            onClick={() => setPaginaSelecionada("criar-prova")}
            className={menuClass("criar-prova")}
          >
            <Plus />
            Criar Prova
          </button>

          <button
            onClick={() => setPaginaSelecionada("alunos")}
            className={menuClass("alunos")}
          >
            <User />
            Alunos
          </button>

          <button
            onClick={() => setPaginaSelecionada("configuracoes")}
            className={menuClass("configuracoes")}
          >
            <Settings />
            Configurações
          </button>
        </div>
        <div className="absolute bottom-8 w-full flex items-center justify-center">
          <button className="w-[90%] py-4 bg-red-600 flex items-center justify-center gap-3 rounded-md transition hover:bg-red-700 hover:cursor-pointer">
            <span className="font-bold text-white text-lg">Sair</span>

            <LogOut />
          </button>
        </div>
      </aside>
      <main className="flex-1 h-screen overflow-hidden bg-gray-100">
        <div className="h-full overflow-y-auto p-8 flex justify-center">
          {renderizarPagina()}
        </div>
      </main>
    </div>
  );
}
