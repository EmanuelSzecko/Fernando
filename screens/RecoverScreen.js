import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { auth } from '../Firebase';
import { useNavigation } from '@react-navigation/native';

export default function RecoverScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      return Alert.alert('Erro', 'Digite seu e-mail');
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir sua senha');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>🔐 Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.btn} onPress={handleReset}>
        <Text style={styles.btnText}>Enviar link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar para o login</Text>
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
    fontSize: 26,
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
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#aaa',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
