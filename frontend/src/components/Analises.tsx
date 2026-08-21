import { useEffect, useState } from "react";
import type { Analytics, Prova } from "../service/api";
import { ProvaAPI, RespostaAPI } from "../service/api";

export default function Analises() {
  const professorId = localStorage.getItem("userId")!;
  const [provas, setProvas] = useState<Prova[]>([]);
  const [selectedProvaId, setSelectedProvaId] = useState("");
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProvas() {
      try {
        const provaApi = new ProvaAPI();
        const response = await provaApi.findAllByProfessor(professorId);
        setProvas(response.data);

        if (response.data.length > 0) {
          setSelectedProvaId(response.data[0].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProvas();
  }, [professorId]);

  useEffect(() => {
    if (!selectedProvaId) return;

    async function loadAnalytics() {
      try {
        const respostaApi = new RespostaAPI();
        const response = await respostaApi.getAnalytics(selectedProvaId);
        setAnalytics(response.data);
      } catch (error) {
        console.error(error);
        setAnalytics(null);
      }
    }

    loadAnalytics();
  }, [selectedProvaId]);

  if (loading) {
    return <p className="text-gray-500">Carregando análises...</p>;
  }

  if (provas.length === 0) {
    return (
      <main className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-800">Análises</h1>
        <p className="text-gray-500 mt-4">
          Crie uma prova e aguarde respostas dos alunos para ver as análises.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-5xl flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Análises</h1>
        <p className="text-gray-500 mt-1">
          Desempenho dos alunos por prova.
        </p>
      </div>

      <select
        value={selectedProvaId}
        onChange={(e) => setSelectedProvaId(e.target.value)}
        className="w-full max-w-md py-3 px-4 rounded-xl border border-gray-200 bg-white"
      >
        {provas.map((prova) => (
          <option key={prova.id} value={prova.id}>
            {prova.title}
          </option>
        ))}
      </select>

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">Total de respostas</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {analytics.totalSubmissions}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">Média da turma</p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                {analytics.averageGrade.toFixed(1)}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">Questão mais difícil</p>
              <p className="text-sm font-medium text-gray-800 mt-2">
                {analytics.hardestQuestion
                  ? `${analytics.hardestQuestion.errorRate}% de erro`
                  : "Sem dados"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">Por questão</h2>
            <div className="space-y-4">
              {analytics.questionStats.map((stat, index) => (
                <div
                  key={stat.questionId}
                  className="border border-gray-100 rounded-xl p-4"
                >
                  <p className="font-medium">
                    {index + 1}. {stat.text}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-green-700">
                      {stat.correctCount} acertos
                    </span>
                    <span className="text-red-600">
                      {stat.wrongCount} erros ({stat.errorRate}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">Notas individuais</h2>
            {analytics.submissions.length === 0 ? (
              <p className="text-gray-500">Nenhuma resposta ainda.</p>
            ) : (
              <div className="space-y-3">
                {analytics.submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{submission.alunoName}</p>
                      <p className="text-sm text-gray-500">
                        Matrícula: {submission.registration}
                      </p>
                    </div>
                    <span className="font-bold text-green-700">
                      {submission.grade?.toFixed(1) ?? "-"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
