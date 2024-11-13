const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  prazo: { type: Date, required: true }, // Data e horário do prazo
  status: {
    type: String,
    enum: ['Em andamento', 'Concluída', 'Atrasada'], // Status da tarefa
    default: 'Em andamento', // Padrão é 'Em andamento'
  },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao usuário
});

taskSchema.pre('save', function (next) {
  if (this.prazo < Date.now() && this.status !== 'Concluída') {
    this.status = 'Atrasada'; // Marca como atrasada se o prazo já passou
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
