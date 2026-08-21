import { CalendarDays, Copy, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Prova, Question } from "../service/api";
import { ProvaAPI } from "../service/api";
import NovaProva from "./NovaProva";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export default function MinhasProvas() {
  const professorId = localStorage.getItem("userId")!;
  const [provas, setProvas] = useState<Prova[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProva, setSelectedProva] = useState<Prova | null>(null);
  const [editingProva, setEditingProva] = useState<Prova | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProvas() {
      try {
        const response = await new ProvaAPI().findAllByProfessor(professorId);
        if (active) setProvas(response.data);
      } catch (error) {
        console.error(error);
        if (active) alert("Erro ao carregar provas.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProvas();
    return () => {
      active = false;
    };
  }, [professorId]);

  async function handleRemove(id: string) {
    if (!confirm("Deseja excluir esta prova?")) return;

    try {
      await new ProvaAPI().remove(id);
      setProvas(provas.filter((prova) => prova.id !== id));
      setSelectedProva(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir prova.");
    }
  }

  function copyLink(formCode: string) {
    const link = `${window.location.origin}/prova/${formCode}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado!");
  }

  if (loading) {
    return <p className="text-gray-500">Carregando provas...</p>;
  }

  if (selectedProva) {
    if (editingProva) {
      return (
        <NovaProva
          prova={editingProva}
          onCancel={() => setEditingProva(null)}
          onSaved={(updatedProva) => {
            setProvas(
              provas.map((prova) =>
                prova.id === updatedProva.id ? updatedProva : prova,
              ),
            );
            setSelectedProva(updatedProva);
            setEditingProva(null);
          }}
        />
      );
    }

    const questions = selectedProva.questions as Question[];

    return (
      <main className="w-full max-w-3xl flex flex-col gap-6">
        <button
          onClick={() => setSelectedProva(null)}
          className="text-green-700 font-medium w-fit hover:underline"
        >
          ← Voltar
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedProva.title}
          </h1>
          <p className="text-gray-500 mt-2">
            Código: {selectedProva.formCode}
          </p>
          <button
            onClick={() => copyLink(selectedProva.formCode)}
            className="mt-4 flex items-center gap-2 text-green-700 font-medium"
          >
            <Copy size={18} />
            Copiar link da prova
          </button>
          <button
            onClick={() => setEditingProva(selectedProva)}
            className="mt-4 ml-4 inline-flex items-center gap-2 text-green-700 font-medium"
          >
            <Pencil size={18} />
            Editar prova
          </button>
        </div>

        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="font-bold text-lg">
              {index + 1}. {question.text}
            </h2>
            <ul className="mt-4 space-y-2">
              {question.alternatives.map((alt) => (
                <li
                  key={alt.key}
                  className={`px-4 py-2 rounded-lg ${
                    alt.key === question.correctAnswer
                      ? "bg-green-100 text-green-800 font-medium"
                      : "bg-gray-50"
                  }`}
                >
                  {alt.key}) {alt.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="w-full max-w-6xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Minhas Provas</h1>
        <p className="text-gray-500 mt-1">
          Visualize e gerencie suas avaliações.
        </p>
      </div>

      {provas.length === 0 ? (
        <p className="text-gray-500">Nenhuma prova criada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {provas.map((prova) => (
            <div
              key={prova.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <FileText className="text-green-700" />
                  </div>

                  <div>
                    <h2 className="font-bold text-xl text-gray-800">
                      {prova.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <CalendarDays size={16} />
                      <span>Criada em {formatDate(prova.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-2 rounded-lg">
                  {(prova.questions as Question[]).length} questões
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyLink(prova.formCode)}
                    className="bg-gray-100 hover:bg-gray-200 transition px-3 py-2 rounded-xl"
                    title="Copiar link"
                  >
                    <Copy size={18} />
                  </button>

                  <button
                    onClick={() => setSelectedProva(prova)}
                    className="bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-xl flex items-center gap-2 font-medium text-gray-700"
                  >
                    <Eye size={18} />
                    Visualizar
                  </button>

                  <button
                    onClick={() => handleRemove(prova.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 transition px-3 py-2 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
