import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/professor.route.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log("server is running...."));
