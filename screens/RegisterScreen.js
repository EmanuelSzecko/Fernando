import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { auth } from '../Firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    if (!email || !senha || !confirmarSenha) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    if (senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem!');
    }

    try {
      await auth().createUserWithEmailAndPassword(email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>📝 Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    color: '#0077b6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
