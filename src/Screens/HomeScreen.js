import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Task from '../components/Task';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Atividade 1', date: '15/10/2024', time: '10:00', completed: false, isLate: true },
    { id: 2, name: 'Atividade 2', date: '21/10/2024', time: '14:00', completed: false, isLate: false },
    { id: 3, name: 'Atividade 3', date: '21/10/2024', time: '09:00', completed: true, isLate: false },
    { id: 4, name: 'Atividade 4', date: '15/10/2024', time: '09:00', completed: false, isLate: true },
    // Outras tarefas
  ]);

  const handleCheckBoxPress = (task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('Details', { task });
  };

  const handleEditPress = (task) => {
    navigation.navigate('Edit', { task });
  };

  const renderTasks = (filterFn) => {
    return tasks
      .filter(filterFn)
      .map((task) => (
        <Task
          key={task.id}
          task={task}
          onCheckBoxPress={handleCheckBoxPress}
          onTaskPress={handleTaskPress}
          onEditPress={handleEditPress}
        />
      ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suas Atividades</Text>

      <TouchableOpacity 
        style={styles.editProfileButton} 
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Image 
          source={require('../../assets/perfil.png')} // Substitua pelo caminho da sua imagem
          style={styles.editProfileIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>Adicionar Atividade</Text>
      </TouchableOpacity>

      {/* Seção Atividades Atrasadas */}
      <Text style={styles.sectionTitle}>Atividades Atrasadas</Text>
      {renderTasks(task => !task.completed && task.isLate)}

      {/* Seção Atividades Em Andamento */}
      <Text style={styles.sectionTitle}>Atividades Em Andamento</Text>
      {renderTasks(task => !task.completed && !task.isLate)}

      {/* Seção Atividades Concluídas */}
      <Text style={styles.sectionTitle}>Atividades Concluídas</Text>
      {renderTasks(task => task.completed)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#06A77D',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  editProfileButton: {
    position: 'absolute',
    top: 1,
    right: 20,
  },
  editProfileIcon: {
    width: 40,
    height: 40, 
    resizeMode: 'contain',
  },
});

export default HomeScreen;
