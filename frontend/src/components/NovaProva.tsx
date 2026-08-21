import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { AlternativeKey, Prova, Question } from "../service/api";
import { ProvaAPI } from "../service/api";

const ALTERNATIVES: AlternativeKey[] = ["A", "B", "C", "D"];

function createEmptyQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    text: "",
    alternatives: ALTERNATIVES.map((key) => ({ key, text: "" })),
    correctAnswer: "A",
  };
}

interface NovaProvaProps {
  prova?: Prova;
  onSaved?: (prova: Prova) => void;
  onCancel?: () => void;
}

export default function NovaProva({
  prova,
  onSaved,
  onCancel,
}: NovaProvaProps) {
  const api = new ProvaAPI();
  const [title, setTitle] = useState(prova?.title ?? "");
  const [questoes, setQuestoes] = useState<Question[]>(
    prova?.questions ?? [createEmptyQuestion()],
  );
  const [loading, setLoading] = useState(false);

  function adicionarQuestao() {
    setQuestoes([...questoes, createEmptyQuestion()]);
  }

  function removerQuestao(id: string) {
    setQuestoes(questoes.filter((q) => q.id !== id));
  }

  function atualizarTextoQuestao(id: string, text: string) {
    setQuestoes(
      questoes.map((q) => (q.id === id ? { ...q, text } : q)),
    );
  }

  function atualizarAlternativa(
    questionId: string,
    key: AlternativeKey,
    text: string,
  ) {
    setQuestoes(
      questoes.map((q) =>
        q.id === questionId
          ? {
              ...q,
              alternatives: q.alternatives.map((alt) =>
                alt.key === key ? { ...alt, text } : alt,
              ),
            }
          : q,
      ),
    );
  }

  function definirGabarito(questionId: string, correctAnswer: AlternativeKey) {
    setQuestoes(
      questoes.map((q) =>
        q.id === questionId ? { ...q, correctAnswer } : q,
      ),
    );
  }

  async function salvarProva() {
    if (!title.trim()) {
      alert("Informe o título da prova.");
      return;
    }

    for (const questao of questoes) {
      if (!questao.text.trim()) {
        alert("Preencha o enunciado de todas as questões.");
        return;
      }

      for (const alt of questao.alternatives) {
        if (!alt.text.trim()) {
          alert("Preencha todas as alternativas.");
          return;
        }
      }
    }

    try {
      setLoading(true);
      const response = prova
        ? await api.update(prova.id, title, questoes)
        : await api.create(title, questoes);

      if (prova) {
        alert("Prova atualizada com sucesso!");
        onSaved?.(response.data);
      } else {
        alert(
          `Prova criada! Link para os alunos: ${window.location.origin}/prova/${response.data.formCode}`,
        );
      }

      if (!prova) {
        setTitle("");
        setQuestoes([createEmptyQuestion()]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar prova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full max-w-3xl flex flex-col gap-6">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {prova ? "Editar Prova" : "Nova Prova"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Avaliação Bimestral de Matemática"
          className="w-full py-4 px-4 rounded-xl border-2 border-gray-200 outline-none focus:border-green-500 transition"
        />
      </div>

      {questoes.map((questao, index) => (
        <div
          key={questao.id}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Questão {index + 1}
            </h3>

            {questoes.length > 1 && (
              <button
                onClick={() => removerQuestao(questao.id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
              >
                <Trash2 />
              </button>
            )}
          </div>

          <textarea
            value={questao.text}
            onChange={(e) => atualizarTextoQuestao(questao.id, e.target.value)}
            placeholder="Digite a pergunta..."
            className="w-full min-h-30 py-3 px-4 rounded-xl border-2 border-gray-200 outline-none resize-none focus:border-green-500 transition"
          />

          <div className="flex flex-col gap-3">
            {questao.alternatives.map((alternativa) => (
              <label
                key={alternativa.key}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-green-400 transition"
              >
                <input
                  type="radio"
                  name={`gabarito-${questao.id}`}
                  checked={questao.correctAnswer === alternativa.key}
                  onChange={() =>
                    definirGabarito(questao.id, alternativa.key)
                  }
                />

                <span className="font-semibold text-gray-600">
                  {alternativa.key}
                </span>

                <input
                  type="text"
                  value={alternativa.text}
                  onChange={(e) =>
                    atualizarAlternativa(
                      questao.id,
                      alternativa.key,
                      e.target.value,
                    )
                  }
                  placeholder={`Alternativa ${alternativa.key}`}
                  className="bg-transparent outline-none w-full"
                />
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Marque a alternativa correta (gabarito).
          </p>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          onClick={adicionarQuestao}
          className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg flex items-center justify-center gap-2 transition shadow-md"
        >
          <Plus />
          Adicionar Questão
        </button>

        <div className="w-full flex gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full py-4 rounded-2xl border border-gray-300 hover:bg-gray-100 font-bold text-lg transition"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={salvarProva}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black hover:bg-gray-900 disabled:opacity-60 text-white font-bold text-lg transition shadow-md"
          >
            {loading ? "Salvando..." : prova ? "Salvar alterações" : "Salvar Prova"}
          </button>
        </div>
      </div>
    </main>
  );
}
