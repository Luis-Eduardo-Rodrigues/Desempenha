import { Plus, Search, UserRound } from "lucide-react";

export default function NovoAluno() {
  return (
    <main className="w-full max-w-5xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Alunos</h1>

        <p className="text-gray-500 mt-1">Gerencie os alunos cadastrados.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl w-full max-w-md">
          <Search className="text-gray-500" size={20} />

          <input
            type="text"
            placeholder="Pesquisar aluno..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        <button className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={20} />
          Novo Aluno
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((aluno) => (
          <div
            key={aluno}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <UserRound className="text-green-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  João Silva
                </h2>

                <p className="text-gray-500 text-sm">2º Ano B</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
