const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha, dataNascimento, cpf } = req.body;

  try {
    // Verificando se o email ou CPF já estão cadastrados
    const userExistente = await User.findOne({ $or: [{ email }, { cpf }] });
    if (userExistente) {
      return res.status(400).json({ message: 'Email ou CPF já cadastrados' });
    }

    // Criando um novo usuário
    const novoUsuario = new User({ nome, email, senha, dataNascimento, cpf });
    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
    try {
      const usuarios = await User.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  });
  

module.exports = router;
