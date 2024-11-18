import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const ShowTask = ({ route, navigation }) => {
  const { taskId } = route.params; // Obtém o ID da tarefa da rota
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Carregar detalhes da tarefa
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        const task = response.data;

        setTaskName(task.nome);
        setDescription(task.descricao);

        const taskDate = new Date(task.prazo);
        setDate(taskDate.toLocaleDateString('pt-BR'));
        setTime(taskDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      } catch (error) {
        console.error('Erro ao buscar os detalhes da tarefa:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nova Atividade"
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        editable={false}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        editable={false}
      />
      <TextInput
        placeholder="DD/MM/AAAA"
        style={styles.input}
        value={date}
        onChangeText={setDate}
        editable={false}
      />
      <TextInput
        placeholder="hh:mm"
        style={styles.input}
        value={time}
        onChangeText={setTime}
        editable={false}
      />

      <CustomButton
        text="Voltar"
        backgroundColor="#8D8D8D"
        textColor="#fff"
        borderRadius={10}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default ShowTask;
