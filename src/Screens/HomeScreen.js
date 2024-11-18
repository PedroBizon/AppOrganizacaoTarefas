import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'; // Importando useRoute

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usar o hook useRoute para pegar os parâmetros de navegação
  const route = useRoute();
  const { refresh } = route.params || {};  // Pega o parâmetro 'refresh' ou define um fallback vazio

  // Função para buscar as tarefas
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
      setLoading(false); // Finaliza o loading quando as tarefas são carregadas
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      setLoading(false); // Finaliza o loading mesmo em caso de erro
    }
  };

  // Buscar tarefas quando a tela for carregada ou quando o parâmetro 'refresh' for passado
  useEffect(() => {
    fetchTasks();
  }, [refresh]); // Se o parâmetro 'refresh' mudar, busca as tarefas novamente

  // Função para marcar/desmarcar uma tarefa
  // Função para marcar/desmarcar uma tarefa
const handleCheckboxPress = async (id, currentStatus) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    // Nova lógica para alternar entre os status
    let updatedStatus;
    
    // Lógica para alternar status de acordo com a situação atual
    if (currentStatus === 'Em andamento') {
      updatedStatus = 'Concluída'; // Se estiver "Em andamento", marca como "Concluída"
    } else if (currentStatus === 'Concluída') {
      updatedStatus = 'Em andamento'; // Se estiver "Concluída", marca como "Em andamento"
    } else if (currentStatus === 'Atrasada') {
      updatedStatus = 'Concluída'; // Se estiver "Atrasada", marca como "Concluída"
    }

    // Enviar a requisição para o backend para atualizar o status
    const response = await axios.put(`http://localhost:5000/api/tasks/${id}/status`, 
      { status: updatedStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Atualiza o estado das tarefas
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === id ? { ...task, status: response.data.status } : task
      )
    );
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
  }
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
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

        {/* Renderizar tarefas conforme o status */}
        {['atrasada', 'em andamento', 'concluída'].map(status => (
          <View key={status}>
            <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>
              {`ATIVIDADES ${status.toUpperCase()}`}
            </Text>
            {tasks.filter(task => task.status.toLowerCase() === status).map(task => (
              <View key={task._id} style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 10, 
                backgroundColor: task.status === 'Em andamento' ? '#0B88BF' : 
                                 task.status === 'Atrasada' ? '#8F1D1D' : '#052F5F', 
                padding: 10, 
                borderRadius: 10
              }}>
                <TouchableOpacity onPress={() => handleCheckboxPress(task._id, task.status)}>
                  <MaterialIcons 
                    name={task.status.toLowerCase() === 'concluída' ? 'check-box' : 'check-box-outline-blank'} 
                    size={30} 
                    color={task.status.toLowerCase() === 'concluída' ? '#06A77D' : '#8D8D8D'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, marginLeft: 10 }} onPress={() => navigation.navigate('ShowTask', { taskId: task._id })}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>{task.nome}</Text>
                  <Text style={{ color: '#aaa', fontSize: 14 }}>
                    {`${new Date(task.prazo).toLocaleDateString()} - ${new Date(task.prazo).toLocaleTimeString()}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EditTask', { taskId: task._id })}>
                  <MaterialIcons name="edit" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
