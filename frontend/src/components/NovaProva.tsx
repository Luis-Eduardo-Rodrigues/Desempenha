import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function NovaProva() {
  const [questoes, setQuestoes] = useState([
    {
      id: 1,
      numero: 1,
    },
  ]);

  function adicionarQuestao() {
    const novaQuestao = {
      id: Date.now(),
      numero: questoes.length + 1,
    };

    setQuestoes([...questoes, novaQuestao]);
  }

  function removerQuestao(id) {
    const novasQuestoes = questoes.filter((q) => q.id !== id);

    const atualizadas = novasQuestoes.map((q, index) => ({
      ...q,
      numero: index + 1,
    }));

    setQuestoes(atualizadas);
  }

  return (
    <main className="w-full max-w-3xl flex flex-col gap-6">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Nova Prova</h2>

        <input
          type="text"
          placeholder="Ex: Avaliação Bimestral de Matemática"
          className="w-full py-4 px-4 rounded-xl border-2 border-gray-200 outline-none focus:border-green-500 transition"
        />
      </div>

      {questoes.map((questao) => (
        <div
          key={questao.id}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Questão {questao.numero}
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
            placeholder="Digite a pergunta..."
            className="
              w-full
              min-h-30
              py-3
              px-4
              rounded-xl
              border-2
              border-gray-200
              outline-none
              resize-none
              focus:border-green-500
              transition
            "
          />

          <div className="flex flex-col gap-3">
            {["A", "B", "C", "D"].map((alternativa) => (
              <label
                key={alternativa}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-green-400 transition"
              >
                <input type="radio" disabled />

                <input
                  type="text"
                  placeholder={`Alternativa ${alternativa}`}
                  className="bg-transparent outline-none w-full"
                />
              </label>
            ))}
          </div>
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

        <button className="w-full py-4 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-lg transition shadow-md">
          Salvar Prova
        </button>
      </div>
    </main>
  );
}
