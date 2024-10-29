import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton'; // Importando o componente de botão reutilizável

const CreateAccount  = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Inputs de edição */}
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
        borderRadius={10}
      />
      <TextInput
        placeholder="Data de Nascimento"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        borderRadius={10}
      />
      <TextInput
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        borderRadius={10}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        borderRadius={10}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        borderRadius={10}
      />
      <TextInput
        placeholder="Confirmar Senha"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        borderRadius={10}
      />

      {/* Botões reutilizáveis */}
      <CustomButton 
        text="Criar Conta" 
        backgroundColor="#005377" 
        textColor="#fff"
        borderRadius={10}
        onPress={() => navigation.navigate('Home')} 
      />
      <CustomButton 
        text="Voltar" 
        backgroundColor="#8D8D8D" 
        textColor="#fff"
        borderRadius={10}
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