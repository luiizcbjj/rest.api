import express from "express";

const minhaApi = express();
nod
minhaApi.use(express.json());

minhaApi.get("/login", (req, res) => {
  console.log("Rota de login acessada");
  res.send("Bem vindo à rota de login!");
});

minhaApi.get("/", (req, res) => {
  res.send("API está funcionando!");
});

minhaApi.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});