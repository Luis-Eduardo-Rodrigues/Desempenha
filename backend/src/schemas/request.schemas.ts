import { z } from "zod";

const requiredText = z.string().trim().min(1, "Campo obrigatório.");
const alternativeKey = z.enum(["A", "B", "C", "D"]);

const questionSchema = z.object({
  id: requiredText,
  text: requiredText,
  alternatives: z
    .array(z.object({ key: alternativeKey, text: requiredText }))
    .length(4, "Cada questão deve possuir quatro alternativas.")
    .refine(
      (alternatives) => new Set(alternatives.map((alternative) => alternative.key)).size === 4,
      "As alternativas A, B, C e D devem ser únicas.",
    ),
  correctAnswer: alternativeKey,
});

export const professorSchema = z.object({
  fullName: requiredText.min(3, "Informe o nome completo."),
  email: z.email("Informe um e-mail válido.").trim().toLowerCase(),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido.").trim().toLowerCase(),
  password: z.string().min(1, "Informe a senha."),
});

export const professorUpdateSchema = z.object({
  fullName: requiredText.min(3, "Informe o nome completo."),
});

export const alunoSchema = z.object({
  fullName: requiredText.min(3, "Informe o nome completo."),
  grade: requiredText,
  registration: requiredText,
});

export const alunoUpdateSchema = alunoSchema.pick({ fullName: true, grade: true });

export const provaSchema = z.object({
  title: requiredText.min(3, "O título deve ter ao menos 3 caracteres."),
  questions: z.array(questionSchema).min(1, "Inclua ao menos uma questão."),
});

export const respostaSchema = z.object({
  formCode: requiredText,
  registration: requiredText,
  answers: z.record(z.string().min(1), alternativeKey),
});
