const express = require('express');
const Task = require('../models/Task');

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

    await novaTarefa.save();
    res.status(201).json({ message: 'Tarefa criada com sucesso', tarefa: novaTarefa });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa', error });
  }
});

module.exports = router;

// Listar tarefas com filtragem de status
router.get('/', async (req, res) => {
    const { status } = req.query; // Filtro opcional de status
    try {
      const tarefas = await Task.find(status ? { status } : {});
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar tarefas' });
    }
  });

// Editar tarefa
router.put('/:id', async (req, res) => {
    const { nome, descricao, prazo } = req.body;
    try {
      const tarefaAtualizada = await Task.findByIdAndUpdate(
        req.params.id,
        { nome, descricao, prazo },
        { new: true }
      );
      res.json(tarefaAtualizada);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao editar tarefa' });
    }
  });

// Excluir tarefa
router.delete('/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
  });

// Atualizar status da tarefa
router.put('/:id/status', async (req, res) => {
  const { status } = req.body; // O status pode ser 'Em andamento', 'Concluída' ou 'Atrasada'
  
  try {
    const tarefa = await Task.findById(req.params.id);
    
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Se a tarefa está sendo marcada como 'Concluída', permitimos a alteração
    if (status === 'Concluída') {
      tarefa.status = 'Concluída';
    } else {
      // Se a tarefa está sendo marcada como 'Em andamento' ou 'Atrasada'
      tarefa.status = status;

      // Se o status não for 'Concluída' e o prazo já passou, marca como 'Atrasada'
      if (status !== 'Concluída' && tarefa.prazo < Date.now()) {
        tarefa.status = 'Atrasada';
      }
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


  
