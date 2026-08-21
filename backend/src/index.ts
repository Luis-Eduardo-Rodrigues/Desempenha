import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { alunoRouter } from "./routes/aluno.route.ts";
import { professorRouter } from "./routes/professor.route.ts";
import { provaRouter } from "./routes/prova.route.ts";
import { respostaRouter } from "./routes/resposta.route.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(professorRouter);
app.use("/provas", provaRouter);
app.use("/alunos", alunoRouter);
app.use("/respostas", respostaRouter);

app.listen(process.env.PORT, () => console.log("server is running...."));
