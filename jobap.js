import express from "express";
const app = express();
app.use(express.json());

let vagas = [
  { id: 1, titulo: "Desenvolvedor Front-end", empresa: "Tech Solutions", local: "Remoto" },
  { id: 2, titulo: "Analista de Dados", empresa: "Data Corp", local: "São Paulo" }
];

let candidatos = [
  { id: 1, nome: "João Silva", habilidades: ["JavaScript", "React"] },
  { id: 2, nome: "Maria Souza", habilidades: ["Python", "SQL"] }
];

app.get('/vagas', (req, res) => {
  res.json(vagas);
});

app.get('/vagas/:id', (req, res) => {
  const vaga = vagas.find(v => v.id === parseInt(req.params.id));
  if (!vaga) return res.status(404).send('Vaga não encontrada');
  res.json(vaga);
});

app.post('/vagas', (req, res) => {
  const novaVaga = {
    id: vagas.length + 1,
    titulo: req.body.titulo,
    empresa: req.body.empresa,
    local: req.body.local
  };
  vagas.push(novaVaga);
  res.status(201).json(novaVaga);
});

app.get('/candidatos', (req, res) => {
  res.json(candidatos);
});

app.post('/candidatos', (req, res) => {
  const novoCandidato = {
    id: candidatos.length + 1,
    nome: req.body.nome,
    habilidades: req.body.habilidades
  };
  candidatos.push(novoCandidato);
  res.status(201).json(novoCandidato);
});

app.post('/vagas/:id/candidatar', (req, res) => {
  const vagaId = parseInt(req.params.id);
  const candidatoId = req.body.candidatoId;
  
  const vaga = vagas.find(v => v.id === vagaId);
  const candidato = candidatos.find(c => c.id === candidatoId);
  
  if (!vaga || !candidato) {
    return res.status(404).send('Vaga ou candidato não encontrado');
  }
  
  console.log(`Candidato ${candidato.nome} se candidatou à vaga ${vaga.titulo}`);
  res.json({ 
    mensagem: 'Candidatura realizada com sucesso!',
    vaga,
    candidato
  });
});

app.get('/', (req, res) => {
  res.send('Bem-vindo ao JobFinder API!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});