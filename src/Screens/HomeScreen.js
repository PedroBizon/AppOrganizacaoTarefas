import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { refresh } = route.params || {};

  const fetchUserId = async () => {
    const id = await AsyncStorage.getItem('userID');
    setUserId(id);
  };

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxPress = async (id, currentStatus) => {
    try {
      const token = await AsyncStorage.getItem('token');
      let updatedStatus = currentStatus === 'Em andamento' ? 'Concluída' : 'Em andamento';
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}/status`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, status: response.data.status } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    if (userId) {
      console.log("User ID fetched:", userId);
    } else {
      console.log("User ID not fetched yet");
    }
  }, [userId]);

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
          <TouchableOpacity onPress={() => userId && navigation.navigate('EditProfile', { id: userId })}>
            <Image source={require('../../assets/perfil.png')} style={styles.profileIcon} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity 
          style={{ backgroundColor: '#06A77D', padding: 10, borderRadius: 10, marginVertical: 10 }}
          onPress={() => navigation.navigate('CreateTask')}
        >
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Adicionar Atividade</Text>
        </TouchableOpacity>

        {['Atrasada', 'Em andamento', 'Concluída'].map(status => (
          <View key={status}>
            <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>
              {`ATIVIDADES ${status.toUpperCase()}`}
            </Text>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <View key={task._id} style={styles.taskContainer(task.status)}>
                  <TouchableOpacity onPress={() => handleCheckboxPress(task._id, task.status)}>
                    <MaterialIcons
                      name={task.status === 'Concluída' ? 'check-box' : 'check-box-outline-blank'}
                      size={30}
                      color={task.status === 'Concluída' ? '#06A77D' : '#8D8D8D'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, marginLeft: 10 }}
                    onPress={() => navigation.navigate('ShowTask', { taskId: task._id })}
                  >
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
  taskContainer: status => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: status === 'Em andamento' ? '#0B88BF' : status === 'Atrasada' ? '#8F1D1D' : '#052F5F',
    padding: 10,
    borderRadius: 10,
  }),
});

export default HomeScreen;
