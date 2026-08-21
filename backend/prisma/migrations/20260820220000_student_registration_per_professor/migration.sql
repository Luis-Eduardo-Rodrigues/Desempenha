-- A matrícula identifica o aluno no contexto de cada professor, não em toda a plataforma.
DROP INDEX "Aluno_registration_key";

CREATE UNIQUE INDEX "Aluno_registration_professorId_key"
ON "Aluno"("registration", "professorId");
