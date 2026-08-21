import { LogOut, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, ProfessorAPI } from "../service/api";

export default function Configuracoes() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")!;
  const [fullName, setFullName] = useState(
    localStorage.getItem("userName") ?? "",
  );
  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") ?? "",
  );
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(fullName);

  useEffect(() => {
    async function loadProfile() {
      try {
        const api = new ProfessorAPI();
        const response = await api.findById(userId);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setDraftName(response.data.fullName);
        localStorage.setItem("userName", response.data.fullName);
        localStorage.setItem("userEmail", response.data.email);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, [userId]);

  async function handleSave() {
    try {
      const api = new ProfessorAPI();
      const response = await api.update(userId, draftName);
      setFullName(response.data.fullName);
      localStorage.setItem("userName", response.data.fullName);
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  async function handleDeleteAccount() {
    if (
      !confirm(
        "Excluir sua conta também removerá seus alunos, provas e respostas. Deseja continuar?",
      )
    ) {
      return;
    }

    try {
      const api = new ProfessorAPI();
      await api.remove(userId);
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir conta.");
    }
  }

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
            {editing ? (
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="bg-transparent outline-none w-full font-medium"
              />
            ) : (
              <span className="font-medium text-gray-800">{fullName}</span>
            )}

            <button
              onClick={() => (editing ? handleSave() : setEditing(true))}
              className="text-green-700 hover:bg-green-100 p-2 rounded-lg transition"
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <div className="mt-2 bg-gray-100 rounded-xl px-4 py-4">
            <span className="font-medium text-gray-800">{email}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm"
      >
        <LogOut />
        Sair da Conta
      </button>

      <button
        onClick={handleDeleteAccount}
        className="border border-red-200 hover:bg-red-50 transition text-red-700 font-semibold py-4 rounded-2xl"
      >
        Excluir minha conta
      </button>
    </main>
  );
}
