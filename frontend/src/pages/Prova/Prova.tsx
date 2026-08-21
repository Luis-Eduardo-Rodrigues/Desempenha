import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AlternativeKey, Question } from "../../service/api.ts";
import { ProvaAPI, RespostaAPI } from "../../service/api.ts";

export default function Prova() {
  const { formCode } = useParams();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [registration, setRegistration] = useState("");
  const [answers, setAnswers] = useState<Record<string, AlternativeKey>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    grade: number;
    alunoName: string;
    provaTitle: string;
  } | null>(null);

  useEffect(() => {
    async function loadProva() {
      try {
        const provaApi = new ProvaAPI();
        const response = await provaApi.findByFormCode(formCode!);
        setTitle(response.data.title);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
        alert("Prova não encontrada.");
      } finally {
        setLoading(false);
      }
    }

    if (formCode) loadProva();
  }, [formCode]);

  function selectAnswer(questionId: string, answer: AlternativeKey) {
    setAnswers({ ...answers, [questionId]: answer });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!registration.trim()) {
      alert("Informe sua matrícula.");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      alert("Responda todas as questões.");
      return;
    }

    try {
      const respostaApi = new RespostaAPI();
      setSubmitting(true);
      const response = await respostaApi.submit(
        formCode!,
        registration,
        answers,
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar prova. Verifique sua matrícula.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Carregando prova...</p>
      </main>
    );
  }

  if (result) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Prova enviada!</h1>
          <p className="text-gray-500 mt-2">{result.provaTitle}</p>
          <p className="text-gray-600 mt-4">Aluno: {result.alunoName}</p>
          <p className="text-5xl font-bold text-green-700 mt-6">
            {result.grade.toFixed(1)}
          </p>
          <p className="text-gray-500 mt-2">Sua nota (0 a 10)</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex flex-col gap-6"
      >
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-2">
            Informe sua matrícula para responder.
          </p>

          <input
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Matrícula escolar"
            className="mt-4 w-full py-3 px-4 rounded-xl border border-gray-200 outline-none focus:border-green-500"
          />
        </div>

        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="font-bold text-lg text-gray-800">
              {index + 1}. {question.text}
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {question.alternatives.map((alt) => (
                <label
                  key={alt.key}
                  className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition ${
                    answers[question.id] === alt.key
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === alt.key}
                    onChange={() => selectAnswer(question.id, alt.key)}
                  />
                  <span className="font-semibold">{alt.key})</span>
                  <span>{alt.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="py-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold text-lg rounded-2xl transition"
        >
          {submitting ? "Enviando..." : "Enviar prova"}
        </button>
      </form>
    </main>
  );
}
