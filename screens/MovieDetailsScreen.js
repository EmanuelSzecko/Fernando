import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieDetailsScreen({ route, navigation }) {
  const { movie } = route.params;

  const salvarFavorito = async () => {
    try {
      const json = await AsyncStorage.getItem('@filmesFavoritos');
      const favoritos = json ? JSON.parse(json) : [];

      const jaExiste = favoritos.some((f) => f.id === movie.id);
      if (jaExiste) {
        Alert.alert('Atenção', 'Este filme já está nos seus favoritos.');
        return;
      }

      favoritos.push(movie);
      await AsyncStorage.setItem('@filmesFavoritos', JSON.stringify(favoritos));
      Alert.alert('Sucesso', 'Filme salvo nos favoritos!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o filme.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {movie.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
      ) : (
        <Text style={styles.noImage}>Imagem não disponível</Text>
      )}

      <Text style={styles.title}>{movie.title}</Text>

      <Text style={styles.label}>📅 Lançamento:</Text>
      <Text style={styles.text}>{movie.release_date || 'Indisponível'}</Text>

      <Text style={styles.label}>⭐ Avaliação:</Text>
      <Text style={styles.text}>{movie.vote_average}/10</Text>

      <Text style={styles.label}>📖 Sinopse:</Text>
      <Text style={styles.overview}>
        {movie.overview || 'Sinopse não disponível.'}
      </Text>

      <TouchableOpacity style={styles.btn} onPress={salvarFavorito}>
        <Text style={styles.btnText}>💾 Salvar nos Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>⬅ Voltar</Text>
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
  poster: {
    width: '100%',
    height: 500,
    borderRadius: 12,
    marginBottom: 20,
  },
  noImage: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#0077b6',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#0077b6',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  overview: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnVoltar: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
