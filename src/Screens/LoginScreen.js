import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import api from '../services/api'; // Importando a configuração da API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenar o token

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/login', { email, senha });
      const { token } = response.data;

      // Armazena o token localmente
      await AsyncStorage.setItem('token', token);

      // Navega para a tela principal
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao fazer login');
    }
  };


 return (
  <View style={styles.container}>
    <View style={styles.loginBox}>
      <Image source={require('../../assets/logo.png')} style={styles.icon} />
      <TextInput
        placeholder="E-mail ou CPF"
        placeholderTextColor="#8D8D8D"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#8D8D8D"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Não possui uma conta?</Text>
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
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
  loginBox: {
    backgroundColor: '#232323',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#005377',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: '#005377',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
  },
});

export default LoginScreen;