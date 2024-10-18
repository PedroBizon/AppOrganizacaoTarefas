import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Simula um carregamento de 2 segundos antes de ir para a página inicial
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.icon}
      />
      <Text style={styles.welcomeText}>Olá “Nome do usuário”</Text>
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
