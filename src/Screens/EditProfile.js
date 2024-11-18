import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton'; 
import axios from 'axios';

const EditProfile = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const userId = route.params?.id; // ID do usuário passado como parâmetro
  console.log("User ID:", userId);  // Verifique se o userId está correto

  const handleSave = async () => {
    if (!name || !dob || !cpf || !email) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/update/${userId}`, {
        nome: name,
        email,
        dataNascimento: dob,
        cpf,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Erro ao atualizar o perfil.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
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

      <CustomButton
        text="Salvar alterações"
        backgroundColor="#005377"
        textColor="#fff"
        onPress={handleSave}
      />
      <CustomButton
        text="Cancelar"
        backgroundColor="#8D8D8D"
        textColor="#fff"
        onPress={() => navigation.navigate('Home')}
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

export default EditProfile;
