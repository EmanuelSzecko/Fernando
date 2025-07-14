import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { getPopularMovies } from '../services/tmdb'; // Certifique-se de que o caminho está correto

export default function HomeScreen() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function carregarFilmes() {
      console.log('🔄 Buscando filmes populares...');
      try {
        const data = await getPopularMovies();
        if (!data || data.length === 0) {
          Alert.alert('Erro', 'Nenhum filme encontrado.');
          return;
        }
        console.log('✅ Filmes carregados:', data.length);
        setFilmes(data);
      } catch (error) {
        console.error('🚫 Erro ao carregar filmes:', error);
        Alert.alert('Erro', 'Não foi possível carregar os filmes.');
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }
    }

    carregarFilmes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0077b6" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Filmes Populares</Text>

      <FlatList
        data={filmes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animated.View style={{ ...styles.card, opacity: fadeAnim }}>
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
            ) : (
              <Text style={styles.noImage}>Sem imagem</Text>
            )}
            <Text style={styles.title}>{item.title}</Text>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  loading: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 26,
    color: '#0077b6',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  poster: {
    width: '100%',
    height: 350,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  noImage: {
    color: '#ccc',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
