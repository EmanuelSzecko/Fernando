import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎞️ Sobre o App</Text>

      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2017/03/06/17/54/popcorn-2120254_1280.jpg',
        }}
        style={styles.banner}
      />

      <Text style={styles.text}>
        Este aplicativo foi desenvolvido para os amantes do cinema! Aqui você
        pode navegar pelos filmes mais populares, ver detalhes e salvar seus
        favoritos.
      </Text>

      <Text style={styles.text}>
        Os dados são fornecidos pela API oficial do{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://developer.themoviedb.org/docs')}
        >
          TMDB
        </Text>
        .
      </Text>

      <Text style={styles.sectionTitle}>🔧 Tecnologias utilizadas:</Text>
      <Text style={styles.item}>• React Native</Text>
      <Text style={styles.item}>• Firebase Auth</Text>
      <Text style={styles.item}>• API TMDB</Text>
      <Text style={styles.item}>• AsyncStorage</Text>
      <Text style={styles.item}>• Navegação com Stack Navigator</Text>

      <Text style={styles.sectionTitle}>📹 Demonstração:</Text>

      <TouchableOpacity
        style={styles.videoBtn}
        onPress={() =>
          Linking.openURL('https://www.youtube.com/watch?v=4CJBuUwd0Os')
        }
      >
        <Text style={styles.videoBtnText}>▶️ Assistir no YouTube</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#0077b6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  link: {
    color: '#0077b6',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    color: '#0077b6',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  videoBtn: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  videoBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
