import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton'; 
import api from '../services/api'; // Importando a configuração da API

const CreateAccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.post('/users/register', {
        nome: name,
        dataNascimento: dob,
        cpf,
        email,
        senha: password,
      });

      Alert.alert('Sucesso', response.data.message);
      navigation.navigate('Login'); // Volta para a tela de login
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Erro ao criar a conta. Tente novamente.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Data de Nascimento"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirmar Senha"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <CustomButton
        text="Criar Conta"
        backgroundColor="#005377"
        textColor="#fff"
        onPress={handleCreateAccount}
      />
      <CustomButton
        text="Voltar"
        backgroundColor="#8D8D8D"
        textColor="#fff"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default CreateAccount;