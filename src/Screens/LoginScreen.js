import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Navega para a tela de carregamento
    navigation.navigate('Loading');

    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="E-mail ou CPF"
          placeholderTextColor="#8D8D8D"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#8D8D8D"
          secureTextEntry={true}
          style={styles.input}
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