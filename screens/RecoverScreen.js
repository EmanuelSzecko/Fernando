// screens/RecoverScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function RecoverScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleRecover = async () => {
    if (!email) {
      return Alert.alert('Erro', 'Informe seu e-mail.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Pronto!', 'Verifique seu e-mail para redefinir a senha.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao recuperar senha', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecover}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
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
    fontSize: 28,
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
