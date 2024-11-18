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
// Atualizar informações do usuário
router.put('/update/:id', async (req, res) => {
  const { nome, email, dataNascimento, cpf } = req.body;

  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(
      req.params.id,
      { nome, email, dataNascimento, cpf },
      { new: true, runValidators: true } // Retorna o documento atualizado e valida os campos
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
  }
});


router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user vem do middleware de autenticação
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os dados do usuário' });
  }
});

// Deletar conta do usuário
router.delete('/delete/:id', async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Conta excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar conta', error: error.message });
  }
});

// Login do usuário
router.post('/login', async (req, res) => {
  console.log('Requisição de login recebida:', req.body); // Logando os dados recebidos
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha inválida' });
    }
    const token = jwt.sign({ id: user._id }, 'seuSegredo', { expiresIn: '1h' });
    res.json({ token, nome: user.nome, id: user._id });
  } catch (error) {
    console.log('Erro no servidor:', error); // Logando erros no backend
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
