require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Supondo que já crie a rota de usuário
const taskRoutes = require('./routes/TaskRoutes'); // Supondo que já crie a rota de tarefa

const app = express();
app.use(express.json()); // Para aceitar JSON no corpo da requisição

connectDB(); // Conexão com o MongoDB

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
