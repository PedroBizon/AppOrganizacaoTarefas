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
router.get('/tasks', async (req, res) => {
    const { status } = req.query; // Filtro opcional de status
    try {
      const tarefas = await Task.find(status ? { status } : {});
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar tarefas' });
    }
  });

// Editar tarefa
router.put('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
  });

// Atualizar status da tarefa para 'Concluída'
router.put('/tasks/:id/status', async (req, res) => {
    const { status } = req.body; // Espera-se que o status seja 'Concluída' (único status que o usuário escolherá manualmente)
    
    if (status !== 'Concluída') {
      return res.status(400).json({ message: "O status só pode ser 'Concluída'" });
    }
  
    try {
      const tarefa = await Task.findById(req.params.id);
      
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      
      // Se o prazo já passou, marca automaticamente como 'Atrasada' se não for 'Concluída'
      if (tarefa.prazo < Date.now() && tarefa.status !== 'Concluída') {
        tarefa.status = 'Atrasada';
      }
  
      // Atualiza o status para 'Concluída' manualmente
      tarefa.status = status;
      await tarefa.save();
  
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar status da tarefa', error });
    }
  });
  
