const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Criar tarefa
router.post('/create', async (req, res) => {
  const { nome, descricao, data, horario, usuarioId } = req.body;

  try {
    // Combinar data e horário
    const prazo = new Date(`${data}T${horario}:00`);

    const novaTarefa = new Task({
      nome,
      descricao,
      prazo,
      usuario: usuarioId,
    });
    if (prazo < Date.now()) {
      novaTarefa.status = 'Atrasada';
    }
    else {
      novaTarefa.status = 'Em andamento';
    }

    await novaTarefa.save();
    res.status(201).json({ message: 'Tarefa criada com sucesso', tarefa: novaTarefa });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa', error });
  }
});

module.exports = router;

// Listar tarefas com filtragem de status
router.get('/', authMiddleware, async (req, res) => {
  const { status } = req.query; // Filtro opcional de status
  try {
    // Filtra tarefas pelo ID do usuário autenticado
    const tarefas = await Task.find({ 
      usuario: req.user.id, 
      ...(status ? { status } : {}) // Aplica o filtro de status, se fornecido
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas' });
  }
});


// Editar tarefa
router.put('/:id', async (req, res) => {
  const { nome, descricao, prazo } = req.body;

  try {
    const tarefa = await Task.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Atualiza os campos editados
    tarefa.nome = nome || tarefa.nome;
    tarefa.descricao = descricao || tarefa.descricao;
    tarefa.prazo = prazo || tarefa.prazo;

    // Verifica o status com base no prazo
    const prazoDate = new Date(prazo);
    const now = new Date();

    if (prazoDate < now && tarefa.status !== 'Concluída') {
      tarefa.status = 'Atrasada';
    }
    else if(prazoDate >= now && tarefa.status != 'Concluída') {
      tarefa.status = 'Em andamento';
    }

    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa', error });
  }
});

  

// Atualizar status da tarefa
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  try {
    const tarefa = await Task.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    if (status === 'Concluída') {
      tarefa.status = 'Concluída';
    } else if (tarefa.prazo < Date.now()) {
      tarefa.status = 'Atrasada';
    } else {
      tarefa.status = status;
    }

    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da tarefa', error });
  }
});

// Obter detalhes de uma tarefa pelo ID
router.get('/:id', async (req, res) => {
  try {
    const tarefa = await Task.findById(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a tarefa', error });
  }
});


  
