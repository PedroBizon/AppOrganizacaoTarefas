import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';  // Certifique-se de que o arquivo api.js está configurado corretamente.

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Email:', email, 'Senha:', password);  // Verifique se os dados estão corretos
    try {
      console.log('Enviando dados:', email, password); // Logando antes da requisição
      const response = await api.post('/users/login', {
        email,  // Utilizando o valor do email
        senha: password,  // Utilizando o valor da senha
      });
      console.log('Resposta da API:', response.data); // Logando a resposta
      const { token, nome, id } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('nome', nome); // Armazenando nome
      await AsyncStorage.setItem('userID', id);

      navigation.navigate('Loading');
    } catch (error) {
      console.log('Erro no login:', error);
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
          value={email}  // Associando o valor do email
          onChangeText={setEmail}  // Atualizando o estado do email
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#8D8D8D"
          secureTextEntry={true}
          style={styles.input}
          value={password}  // Associando o valor da senha
          onChangeText={setPassword}  // Atualizando o estado da senha
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
