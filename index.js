import 'dotenv/config';  
import express from "express"; // importa o Express
import cors from 'cors';  
import tratarErro from './middlewares/erro.js';
import logger from "./middlewares/logger.js"; // importa o middleware de log
import alunosRouter from "./routes/alunos.js"; // importa o router de alunos
import mensagensRouter from "./routes/mensagens.js"; // importa o router de mensagens

const app = express(); // cria a aplicação Express
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); // 1º — parseia JSON do body
app.use(logger); // 2º — registra log de cada requisição

// rota raiz — boas-vindas
app.get("/", (req, res) => {
  res.json({ mensagem: "Yearbook API está no ar! 🎓" });
});

// rota de health check
app.get("/status", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// registra as rotas de alunos com prefixo /alunos
app.use("/alunos", alunosRouter);

// registra as rotas de mensagens com prefixo /mensagens
app.use("/mensagens", mensagensRouter);

app.use(tratarErro);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;
