import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);  // Iniciar o estado vazio
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const [error, setError] = useState(null);  // Estado de erro

  // Usamos o useEffect para fazer a requisição quando o componente for carregado
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks'); // URL do backend
        setTasks(response.data); // Atualiza o estado com os dados recebidos
      } catch (err) {
        setError('Erro ao carregar as tarefas');
        console.error(err);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTasks(); // Chama a função de buscar tarefas
  }, []);

  if (loading) {
    return <Text>Carregando tarefas...</Text>;  // Mensagem de carregamento
  }

  if (error) {
    return <Text>{error}</Text>;  // Mensagem de erro
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Suas Atividades</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Image source={require('../../assets/perfil.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={{ backgroundColor: '#06A77D', padding: 10, borderRadius: 10, marginVertical: 10 }}
          onPress={() => navigation.navigate('CreateTask')}
        >
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Adicionar Atividade</Text>
        </TouchableOpacity>

        {/* Seção de Atividades Atrasadas */}
        <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>ATIVIDADES ATRASADAS</Text>
        {tasks.filter(task => task.status === 'atrasada').map(task => (
          <View 
            key={task._id}  // Usar o _id da tarefa
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#8F1D1D', padding: 10, borderRadius: 10 }}
          >
            <TouchableOpacity onPress={() => handleCheckboxPress(task.id)}>
              <MaterialIcons
                name={task.completed ? 'check-box' : 'check-box-outline-blank'}
                size={30}
                color={task.completed ? '#06A77D' : '#8D8D8D'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ flex: 1, marginLeft: 10 }} 
              onPress={() => navigation.navigate('ShowTask', { taskId: task._id })}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>{task.name}</Text>
              <Text style={{ color: '#aaa', fontSize: 14 }}>{`${task.date} - ${task.time}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { taskId: task._id })}>
              <MaterialIcons name="edit" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        
        {/* Replicar isso para outras categorias: "Em Andamento", "Concluídas" */}

      </View>
    </ScrollView>
  );
};

export default HomeScreen;
