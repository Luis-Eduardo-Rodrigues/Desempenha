import { Pencil, Plus, Search, Trash2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { Aluno } from "../service/api";
import { AlunoAPI } from "../service/api";

export default function NovoAluno() {
  const professorId = localStorage.getItem("userId")!;
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [registration, setRegistration] = useState("");
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAlunos() {
      try {
        const response = await new AlunoAPI().findAllByProfessor(professorId);
        if (active) setAlunos(response.data);
      } catch (error) {
        console.error(error);
        if (active) alert("Erro ao carregar alunos.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAlunos();
    return () => {
      active = false;
    };
  }, [professorId]);

  async function handleCreate() {
    if (!fullName.trim() || !grade.trim() || !registration.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await new AlunoAPI().create(fullName, grade, registration);
      setAlunos([...alunos, response.data]);
      setFullName("");
      setGrade("");
      setRegistration("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar aluno.");
    }
  }

  async function handleRemove(id: string) {
    if (!confirm("Deseja excluir este aluno?")) return;

    try {
      await new AlunoAPI().remove(id);
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir aluno.");
    }
  }

  function startEdit(aluno: Aluno) {
    setEditingAluno(aluno);
    setFullName(aluno.fullName);
    setGrade(aluno.grade);
    setRegistration(aluno.registration);
    setShowForm(true);
  }

  function cancelForm() {
    setEditingAluno(null);
    setFullName("");
    setGrade("");
    setRegistration("");
    setShowForm(false);
  }

  async function handleSave() {
    if (editingAluno) {
      if (!fullName.trim() || !grade.trim()) {
        alert("Preencha nome e turma.");
        return;
      }

      try {
        const response = await new AlunoAPI().update(
          editingAluno.id,
          fullName,
          grade,
        );
        setAlunos(
          alunos.map((aluno) =>
            aluno.id === editingAluno.id ? response.data : aluno,
          ),
        );
        cancelForm();
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar aluno.");
      }
      return;
    }

    await handleCreate();
  }

  const filtered = alunos.filter(
    (aluno) =>
      aluno.fullName.toLowerCase().includes(search.toLowerCase()) ||
      aluno.registration.includes(search),
  );

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar aluno..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        <button
          onClick={() => (showForm ? cancelForm() : setShowForm(true))}
          className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Aluno
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-xl">
            {editingAluno ? "Editar aluno" : "Cadastrar aluno"}
          </h2>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nome completo"
            className="w-full py-3 px-4 rounded-xl border border-gray-200 outline-none focus:border-green-500"
          />

          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Turma (ex: 2º Ano B)"
            className="w-full py-3 px-4 rounded-xl border border-gray-200 outline-none focus:border-green-500"
          />

          <input
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Matrícula"
            disabled={Boolean(editingAluno)}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 outline-none focus:border-green-500 disabled:bg-gray-100 disabled:text-gray-500"
          />

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
          >
            {editingAluno ? "Salvar alterações" : "Salvar aluno"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Carregando alunos...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">Nenhum aluno cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((aluno) => (
            <div
              key={aluno.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <UserRound className="text-green-700" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {aluno.fullName}
                    </h2>
                    <p className="text-gray-500 text-sm">{aluno.grade}</p>
                    <p className="text-gray-400 text-sm">
                      Matrícula: {aluno.registration}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(aluno)}
                    className="text-green-700 hover:bg-green-100 p-2 rounded-lg"
                    title="Editar aluno"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleRemove(aluno.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg"
                    title="Excluir aluno"
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
