import { CalendarDays, Eye, FileText } from "lucide-react";

export default function MinhasProvas() {
  return (
    <main className="w-full max-w-6xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Minhas Provas</h1>

        <p className="text-gray-500 mt-1">
          Visualize e gerencie suas avaliações.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[1, 2, 3].map((prova) => (
          <div
            key={prova}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <FileText className="text-green-700" />
                </div>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    Prova Bimestral de Matemática
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <CalendarDays size={16} />

                    <span>Criada em 16/05/2026</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-2 rounded-lg">
                10 questões
              </span>

              <button className="bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-xl flex items-center gap-2 font-medium text-gray-700">
                <Eye size={18} />
                Visualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
