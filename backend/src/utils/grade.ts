import type { Question, StudentAnswers } from "../types/prova.types.ts";

export function calculateGrade(questions: Question[], answers: StudentAnswers) {
  if (questions.length === 0) return 0;

  let correct = 0;

  for (const question of questions) {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  }

  return Number(((correct / questions.length) * 10).toFixed(2));
}

export function stripCorrectAnswers(questions: Question[]) {
  return questions.map(({ correctAnswer: _, ...question }) => question);
}
