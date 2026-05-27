import { LogOut, Pencil } from "lucide-react";

export default function Configuracoes() {
  return (
    <main className="w-full max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Configurações</h1>

        <p className="text-gray-500 mt-1">Informações da sua conta.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col gap-6">
        <div>
          <label className="text-sm text-gray-500">Nome</label>

          <div className="mt-2 flex items-center justify-between bg-gray-100 rounded-xl px-4 py-4">
            <span className="font-medium text-gray-800">Luis Eduardo</span>

            <button className="text-green-700 hover:bg-green-100 p-2 rounded-lg transition">
              <Pencil size={18} />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>

          <div className="mt-2 bg-gray-100 rounded-xl px-4 py-4">
            <span className="font-medium text-gray-800">luis@email.com</span>
          </div>
        </div>
      </div>
      <button className="bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm">
        <LogOut />
        Sair da Conta
      </button>
    </main>
  );
}
