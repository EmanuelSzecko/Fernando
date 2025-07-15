// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 MovieApp</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#0077b6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 8
  }
});
