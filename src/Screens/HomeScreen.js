import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  // Exemplo de dados de atividades
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Atividade 1', date: '20/10/2024', time: '14:00', completed: false, status: 'atrasada' },
    { id: 2, name: 'Atividade 2', date: '21/10/2024', time: '16:30', completed: false, status: 'em andamento' },
    { id: 3, name: 'Atividade 3', date: '22/10/2024', time: '09:00', completed: true, status: 'concluída' }
  ]);

  // Função para marcar/desmarcar uma tarefa
  const handleCheckboxPress = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 20 }}>
        {/* Imagem de Perfil */}
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
            key={task.id} 
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
              onPress={() => navigation.navigate('ShowTask', { taskId: task.id })}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>{task.name}</Text>
              <Text style={{ color: '#aaa', fontSize: 14 }}>{`${task.date} - ${task.time}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { taskId: task.id })}>
              <MaterialIcons name="edit" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Seção de Atividades em Andamento */}
        <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>ATIVIDADES EM ANDAMENTO</Text>
        {tasks.filter(task => task.status === 'em andamento').map(task => (
          <View 
            key={task.id} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#0B88BF', padding: 10, borderRadius: 10 }}
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
              onPress={() => navigation.navigate('ShowTask', { taskId: task.id })}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>{task.name}</Text>
              <Text style={{ color: '#aaa', fontSize: 14 }}>{`${task.date} - ${task.time}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { taskId: task.id })}>
              <MaterialIcons name="edit" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Seção de Atividades Concluídas */}
        <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>ATIVIDADES CONCLUÍDAS</Text>
        {tasks.filter(task => task.status === 'concluída').map(task => (
          <View 
            key={task.id} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#005377', padding: 10, borderRadius: 10 }}
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
              onPress={() => navigation.navigate('ShowTask', { taskId: task.id })}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>{task.name}</Text>
              <Text style={{ color: '#aaa', fontSize: 14 }}>{`${task.date} - ${task.time}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { taskId: task.id })}>
              <MaterialIcons name="edit" size={30} color="#fff" />
            </TouchableOpacity>
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
  }
});
