export type AlternativeKey = "A" | "B" | "C" | "D";

export interface QuestionAlternative {
  key: AlternativeKey;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  alternatives: QuestionAlternative[];
  correctAnswer: AlternativeKey;
}

export type StudentAnswers = Record<string, AlternativeKey>;
