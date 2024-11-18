import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const LoadingScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(''); // Para armazenar o nome do usuário

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Obtém o token armazenado
        if (token) {
          // Faz uma requisição para buscar os dados do usuário
          const response = await api.get('/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.nome); // Define o nome do usuário
        }
      } catch (error) {
        console.log('Erro ao buscar dados do usuário:', error);
      }
  
      // Após carregar, navega para a tela principal
      setTimeout(() => {
        navigation.replace('Home');
      }, 2000);
    };
  
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.icon} />
      <Text style={styles.welcomeText}>
        Olá, {userName ? userName : 'Carregando...'}!
      </Text>
      <Text style={styles.loadingText}>Bem-vindo</Text>
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoadingScreen;
