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
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase'; // certifique-se de que esse caminho está correto
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Main'); // Redireciona para as abas
    } catch (error) {
      console.error('Erro ao logar:', error);
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>🎥 Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#888"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar nova conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
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
    fontSize: 32,
    color: '#0077b6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
