// screens/MovieDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { getMovieDetails, getImageUrl } from '../services/tmdb';

export default function MovieDetailsScreen({ route }) {
  const { movieId } = route.params;
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    async function fetchFilme() {
      const data = await getMovieDetails(movieId);
      setFilme(data);
    }
    fetchFilme();
  }, [movieId]);

  if (!filme) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0077b6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: getImageUrl(filme.backdrop_path || filme.poster_path) }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{filme.title}</Text>

        <Text style={styles.subtitle}>Lançamento: {filme.release_date}</Text>
        <Text style={styles.subtitle}>Nota: {filme.vote_average} ⭐</Text>

        <Text style={styles.overview}>{filme.overview || 'Sem sinopse disponível.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  loading: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 250
  },
  infoContainer: {
    padding: 16
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 6
  },
  overview: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22
  }
});
