import { LockKeyhole, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-5 rounded-full">
            <LockKeyhole size={50} className="text-red-500" />
          </div>
        </div>

        <span className="text-red-500 font-bold text-lg">Erro 401</span>

        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          Acesso não autorizado
        </h1>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Você não possui permissão para acessar esta página ou sua sessão
          expirou.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition"
          >
            Fazer Login
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
}
