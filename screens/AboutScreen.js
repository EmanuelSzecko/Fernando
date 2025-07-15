// screens/AboutScreen.js
import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function AboutScreen() {
  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎬 CineEmanuel</Text>

      <Text style={styles.text}>
        Este app foi desenvolvido como parte de um projeto de estudos em React Native com foco em consumo de APIs, navegação entre telas e gerenciamento de estado local.
      </Text>

      <Text style={styles.text}>
        Todos os dados de filmes são fornecidos pela API do TMDB.
      </Text>

      <Text style={styles.homenagem}>
        💙 Homenagem especial ao Professor Fernando, que com dedicação, paciência e muito conhecimento, inspirou e guiou todos nós no caminho do desenvolvimento mobile. Obrigado por ser um exemplo dentro e fora da sala de aula!
      </Text>

      <Text style={styles.subtitulo}>Me acompanhe nas redes:</Text>

      <View style={styles.links}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => abrirLink('https://www.instagram.com/seu_usuario')}
        >
          <Ionicons name="logo-instagram" size={24} color="#fff" />
          <Text style={styles.linkText}>@seu_usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => abrirLink('https://github.com/seu_usuario')}
        >
          <FontAwesome name="github" size={24} color="#fff" />
          <Text style={styles.linkText}>github.com/seu_usuario</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Desenvolvido por Emanuel 💻</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00b4d8',
    textAlign: 'center',
    marginBottom: 20
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22
  },
  homenagem: {
    color: '#90e0ef',
    fontSize: 16,
    marginVertical: 20,
    fontStyle: 'italic',
    lineHeight: 24
  },
  subtitulo: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  links: {
    gap: 12
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  linkText: {
    color: '#fff',
    fontSize: 16
  },
  footer: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14
  }
});
